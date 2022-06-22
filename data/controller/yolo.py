from flask import Flask, render_template, request, jsonify, Blueprint
yolo = Blueprint('yolo', __name__)
from dotenv import load_dotenv
import os
import urllib.request
import cv2
import numpy as np
import ssl
import torch
from PIL import Image
from icevision.all import *
from io import BytesIO
from flask import send_file
#Model
extra_args={}
model_type=models.ultralytics.yolov5
backbone=model_type.backbones.small
extra_args['img_size']=384
classes= ['Cherry leaf',
 'Peach leaf',
 'Corn leaf blight',
 'Apple rust leaf',
 'Potato leaf late blight',
 'Strawberry leaf',
 'Corn rust leaf',
 'Tomato leaf late blight',
 'Tomato mold leaf',
 'Potato leaf early blight',
 'Apple leaf',
 'Tomato leaf yellow virus',
 'Blueberry leaf',
 'Tomato leaf mosaic virus',
 'Raspberry leaf',
 'Tomato leaf bacterial spot',
 'Squash Powdery mildew leaf',
 'grape leaf',
 'Corn Gray leaf spot',
 'Tomato Early blight leaf',
 'Apple Scab Leaf',
 'Tomato Septoria leaf spot',
 'Tomato leaf',
 'Soyabean leaf',
 'Bell_pepper leaf spot',
 'Bell_pepper leaf',
 'grape leaf black rot',
 'Potato leaf',
 'Tomato two spotted spider mites leaf']
class_map= ClassMap(classes)
model=model_type.model(backbone=backbone(pretrained=True),num_classes=len(class_map),**extra_args)
state_dict= torch.load('yolo_trained.pth',map_location=torch.device('cpu'))
model.load_state_dict(state_dict)
valid_tfms = tfms.A.Adapter(
    [*tfms.A.resize_and_pad(384), tfms.A.Normalize()])
def show_preds_gradio(input_image, detection_threshold):
    if detection_threshold==0:
       detection_threshold=0.5
    img = Image.fromarray(input_image, 'RGB')
    pred_dict = model_type.end2end_detect(img, valid_tfms, model, class_map=class_map, detection_threshold=detection_threshold,
                                          display_label=True, display_bbox=True, return_img=True,
                                          font_size=16, label_color="#FF59D6")
    return pred_dict['img']
def serve_pil_image(pil_img):
    img_io = BytesIO()
    pil_img.save(img_io, 'JPEG', quality=70)
    img_io.seek(0)
    return send_file(img_io, mimetype='image/jpeg')

load_dotenv()
bucket = os.environ.get("AWS_S3_BUCKET")
aws_access_key = os.environ.get("AWS_ACCESS_KEY")
aws_secret_access_key = os.environ.get("AWS_SECRET_ACCESS_KEY")
aws_region = os.environ.get("AWS_REGION")

@yolo.route('/')
def main():
    return render_template('home.html')

@yolo.route('/diary/<name>', methods=['GET'])
def predict(name):
    try:
        def s3_get_image_url( name):
                    # location=s3.get_bucket_location(Bucket="ap-northeast-2")["LocationConstraint"]
            return f"https://s3.{aws_region}.amazonaws.com/{bucket}/diag_img/{name}"
        context = ssl._create_unverified_context()
        req = urllib.request.urlopen(s3_get_image_url(name), context=context)
    except:
        print('s3에 해당파일이 없습니다!')
    img = np.asarray(bytearray(req.read()), dtype="uint8")
    img = cv2.imdecode(img, cv2.IMREAD_COLOR)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    #img=Image.fromarray(img)
    output=show_preds_gradio(img, 0.5)
    #print(type(output)) #<class 'PIL.Image.IMage'>
    return serve_pil_image(output)
