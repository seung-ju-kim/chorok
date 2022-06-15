from flask import Flask, render_template, request, jsonify, Blueprint
from dotenv import load_dotenv
from torchvision import transforms as T
import torch
import urllib.request
import os
import cv2
from PIL import Image
import numpy as np
import boto3

ml = Blueprint('ml', __name__)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
load_dotenv()
bucket = os.environ.get("AWS_S3_BUCKET")
aws_access_key = os.environ.get("AWS_ACCESS_KEY")
aws_secret_access_key = os.environ.get("AWS_SECRET_ACCESS_KEY")
aws_region = os.environ.get("AWS_REGION")


@ml.route('/')
def main():
    return render_template('home.html')

def count_frequency(my_list):
    
    count = {}
    
    for item in my_list:
        count[item] = count.get(item, 0) + 1
        
    return count

def edge_and_cut(img):
    emb_img = img.copy()
    edges = cv2.Canny(img, 100, 200)
    edge_coors = []
    for i in range(edges.shape[0]):
        for j in range(edges.shape[1]):
            if edges[i][j] != 0:
                edge_coors.append((i, j))
    
    row_min = edge_coors[np.argsort([coor[0] for coor in edge_coors])[0]][0]
    row_max = edge_coors[np.argsort([coor[0] for coor in edge_coors])[-1]][0]
    col_min = edge_coors[np.argsort([coor[1] for coor in edge_coors])[0]][1]
    col_max = edge_coors[np.argsort([coor[1] for coor in edge_coors])[-1]][1]
    new_img = img[row_min:row_max, col_min:col_max]
    return new_img

def work(imgs):
    imgs = imgs.unsqueeze(0)
    model2=torch.load('k_cross_CNN.pt', map_location=device)
    model2.eval()
    with torch.no_grad():
            encode = model2(imgs)
            #print(encode)
            print(np.round(encode.numpy()[0], decimals=2))
            for be in encode:#여기서 be는 encode 원소들 즉, 예측결과
                #print(be)
                count= count_frequency(np.round(be.numpy(), decimals=2))
                if 1.0 in count.keys() and count[1.0]>=2 :
                        temp=np.argpartition(be.cpu().detach().numpy(), -2)[-2:]
                        lbs=4 if 0 in temp else temp[0]
                else:   lbs=np.argmax(be.detach().numpy())
    return lbs
 
   
def s3_connection():
    try:
        s3 = boto3.client(
            service_name="s3",
            region_name=aws_region,
            aws_access_key_id=aws_access_key,
            aws_secret_access_key=aws_secret_access_key,
        )
    except Exception as e:
        print(e)
    else:
        print("s3 bucket connected!")
        return s3


@ml.route('/predict/<name>', methods=['GET'])
def predict(name):
    #s3 = s3_connection()
    def s3_get_image_url( name):
            # location=s3.get_bucket_location(Bucket="ap-northeast-2")["LocationConstraint"]
        return f"https://s3.{aws_region}.amazonaws.com/{bucket}/diag_img/{name}"
    req = urllib.request.urlopen(s3_get_image_url( name))
    img = np.asarray(bytearray(req.read()), dtype="uint8")
    img = cv2.imdecode(img, cv2.IMREAD_COLOR)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = edge_and_cut(img)
    img=Image.fromarray(img)
    VALID_TRANSFORM = T.Compose([
    T.Resize(256),
    T.CenterCrop(224),
    T.ToTensor(),
    T.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225]),
    # T.Normalize([0.431, 0.498,  0.313], [0.237, 0.239, 0.227]),  # custom
    ])
    img=VALID_TRANSFORM(img)
    idx=work(img)
    my_dict={'cider apple rust': 0,'frog eye leaf spot': 1,'healthy': 2,'powdery mildew': 3,'rust': 4,'scab': 5}
    def get_key(val):
        for key, value in my_dict.items():
         if val == value:
             return key
 
        return "There is no such Key"
    #result_string="This pathology is %s"%(get_key(idx))
    return jsonify(get_key(idx))
