from flask import Flask, render_template, request, jsonify, Blueprint
import torch
import pandas as pd
import urllib.request
import os
import cv2
import pytorch_lightning as pl
import numpy as np
import itertools
import boto3
#from kaggle_imgclassif.plant_pathology.augment import TORCHVISION_TRAIN_TRANSFORM, TORCHVISION_VALID_TRANSFORM
#from kaggle_imgclassif.plant_pathology.data import PlantPathologyDM
#from kaggle_imgclassif.plant_pathology.models import MultiPlantPathology
ml=Blueprint('ml',__name__)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

@ml.route('/')
def main():
    return render_template('home.html')
def work(img):
    train_data=pd.read_csv('files/train.csv')
    labels_all=list(itertools.chain(*[lbs.split(" ") for lbs in train_data['labels']]))
    labels_unique = sorted(set(labels_all))
    labels_lut = {lb: i for i, lb in enumerate(labels_unique)}
    checkpoint = torch.load('example.ckpt')
    new_model = MultiPlantPathology(model='resnext101_32x8d', num_classes=7)
    new_weights=new_model.state_dict()
    old_weights=list(checkpoint['state_dict'].items())

    i=0
    for k, _ in new_weights.items():
        new_weights[k] = old_weights[i][1]
        i += 1

    new_model.load_state_dict(new_weights)
    preds=[]
    new_model.eval()
#이미지 전처리#
    # img=img.cuda()
    # with torch.no_grad():
    #     encode=new_model(img)
    # class_prediction=np.round(encode.cpu().detach().numpy(),decimals=2)
    # def onehot_to_label(val): 
    #     return [k for k,v in labels_lut.items() if v == np.argmax(val.cpu().detach().numpy())]
    # for be, name in zip(encode, img):
    #     lbs = onehot_to_label(be)
    #     preds.append(dict(image=name, labels=" ".join(lbs)))
def s3_connection():
    try:
        s3 = boto3.client(
            service_name="s3",
            region_name="ap-northeast-2", # 자신이 설정한 bucket region
            aws_access_key_id={"AKIATDHLRRZBTKTNOTXB"},
            aws_secret_access_key={"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"},
        )
    except Exception as e:
        print(e)
    else:
        print("s3 bucket connected!")
        return s3

s3 = s3_connection()
@ml.route('/predict/<name>',methods=['GET'])
def predict(name):
    s3 = s3_connection()
    bucket="ap-northeast-2"
    def s3_get_image_url(s3,name):
        #location=s3.get_bucket_location(Bucket="ap-northeast-2")["LocationConstraint"]
        return f"https://s3.ap-northeast-2.amazonaws.com/version3.0/diag_img/{name}"
    req = urllib.request.urlopen(s3_get_image_url(s3,name))
    img = np.asarray(bytearray(req.read()), dtype="uint8")
    img = cv2.imdecode(img, cv2.IMREAD_COLOR)
    # 업로드 폴더에 있는 해당 이미지 읽기
    # img = cv2.imread(img_l, cv2.IMREAD_COLOR)
    # img = cv2.imread('./upload/' + filename + '.jpg', cv2.IMREAD_COLOR)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    #img = cv2.imread("upload/test1.jpg")
    img = cv2.resize(img, None, fx=0.4, fy=0.4)
    height, width, channels = img.shape
    return jsonify(img.shape)
    # img=np.asarray(bytearray(req.read()),dtype='uint8')
    # print(img.shape)
    # #idx=work(img , model)
    # result_string="This pathology is %d"%(img)
    #return jsonify(jsonTicker)