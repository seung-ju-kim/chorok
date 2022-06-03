from flask import Flask, render_template, request, jsonify, Blueprint
import tensorflow as tf
import PIL.Image as Image
import cv2
ml=Blueprint('ml',__name__)
model=tf.keras.models.load_model("en_model")
@ml.route('/')
def main():
    return render_template('home.html')
def work(img,model):
    pred=model.predict(img)
    pred=pred[0]
    idx=tf.math.argmax(pred)
    return idx
@ml.route('/predict',methods=['GET'])
def predict():
    # imgurl=request.args.get("img")
    # result_string="please input image url"
    # if imgurl != None:
    #imgurl=imgurl.split("?")[0]
    img=cv2.imread('./001.png', cv2.IMREAD_COLOR)
    img = cv2.resize(img, (64, 64))
    img=img/255
    img=tf.keras.utils.img_to_array(img)
    img=tf.expand_dims(img,axis=0)
    print(img.shape)
    idx=work(img , model)
    result_string="This number is %d"%(idx)
    return jsonify(result_string)