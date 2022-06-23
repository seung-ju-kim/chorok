from flask import Flask, render_template, request, jsonify, Blueprint
ml = Blueprint('ml', __name__)
from dotenv import load_dotenv
import os
load_dotenv()
bucket = os.environ.get("AWS_S3_BUCKET")
aws_access_key = os.environ.get("AWS_ACCESS_KEY")
aws_secret_access_key = os.environ.get("AWS_SECRET_ACCESS_KEY")
aws_region = os.environ.get("AWS_REGION")

@ml.route('/')
def main():
    return render_template('home.html')

@ml.route('/diary/<name>', methods=['GET'])
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
    idx,temp=work(img)
    stat=[temp[i] for i in idx]
    my_dict={'rust': 0,'frog eye leaf spot': 1,'healthy': 2,'powdery mildew': 3,'scab': 4}#,'rust':4}
    #print(idx)
    def get_key(val):
        for key, value in my_dict.items():
         if val == value:
             return key
 
        return "There is no such Key"
    result_dict={}
    for i in range(0,2):
        result_dict[get_key(idx[i])]=float(stat[i])
    print(json.dumps(result_dict))
    return jsonify(json.dumps(result_dict))

