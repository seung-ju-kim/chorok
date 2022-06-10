from flask import Flask, render_template, request, jsonify, Blueprint
import torch
import pandas as pd
from urllib.request import Request,urlopen
import os
import pytorch_lightning as pl
import numpy as np
import itertools
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

@ml.route('/predict/<name>',methods=['GET'])
def predict(name):
    req=Request(os.path.join('https://s3.ap-northeast-2.amazonaws.com/version3.0/flask_img/','name'), headers={'User-Agent': 'Mozilla/5.0'})
    page=urlopen(req).read()
    # img=np.asarray(bytearray(req.read()),dtype='uint8')
    # print(img.shape)
    # #idx=work(img , model)
    # result_string="This pathology is %d"%(img)
    #return jsonify(jsonTicker)