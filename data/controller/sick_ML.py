from flask import Flask, render_template, request, jsonify, Blueprint
import pickle


ml=Blueprint('ml',__name__)
Model=pickle.load(open('./file/model2.pkl','rb'))
@ml.route('/')
def main():
    return render_template('home.html')
@ml.route('/predict',methods=['POST'])
def home():
    params=request.files #이미지 받아오기
    assert params==None, "프론트에서 파일을 받아오지 못했습니다!"
    #모델 아웃풋
    
    