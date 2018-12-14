#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import argparse
import time

import cv2
import imutils
import numpy as np
from flask import Flask

ROOT = "C:/Users/Eduard/Documents/Informatik/WS18_19/datadazed/Face Detection"
PROTOTXT = "deploy.prototxt"
PRETRAINED_MODEL = "res10_300x300_ssd_iter_140000.caffemodel"
CONFIDENCE = 0.9

# model that will do the face detection
net = None
# VideoStream from the webcam
cam = None

app = Flask(__name__)


@app.route("/init")
def setup():
    global cam, net
    # load our serialized model from disk
    print("[INFO] loading model...")
    net = cv2.dnn.readNetFromCaffe(ROOT + PROTOTXT,
                                   ROOT + PRETRAINED_MODEL)

    msg = "Face detector initialized."
    return msg


@app.route("/detect")
def detect():
    """
    Comment:
    cam initialization can be moved to /init as soon as prototyping in Unity is
    done for speedup. Currently unity also needs webcam access and no two
    programs can access the webcam at the same time.
    """
    # get webcam access
    cam = cv2.VideoCapture(0)
    frame = None
    # skip emtpy frames
    while (frame is None):
        _, frame = cam.read()

    # make it smaller & keep aspect ratio
    frame = imutils.resize(frame, width=400)

    # grab the frame dimensions and convert it to a blob
    (h, w) = frame.shape[:2]
    blob = cv2.dnn.blobFromImage(cv2.resize(frame, (300, 300)), 1.0,
                                 (300, 300), (104.0, 177.0, 123.0))

    # pass the blob through the network and obtain the detections and
    # predictions
    net.setInput(blob)
    detections = net.forward()

    previous_confidence = 0
    final_detection = None

    # loop over the detections
    for i in range(detections.shape[2]):
        # extract the confidence (i.e., probability) associated with the
        # prediction
        confidence = detections[0, 0, i, 2]

        # filter out weak detections by ensuring the `confidence` is
        # greater than the minimum confidence
        if confidence < CONFIDENCE:
            continue

        # always pick the strongest detection
        if confidence > previous_confidence:
            previous_confidence = confidence
            final_detection = detections[0, 0, i, 3:7]

    # topleft x, topleft y, bottom right x, bottom right y
    # these are RELATIVE coordinates to make it independent
    # from webcam size, only dependent on aspect ratio
    (x1, y1, x2, y2) = final_detection.astype("float")
    msg = "{0} {1} {2} {3}".format(x1, y1, x2, y2)

    # TODO: remove after Unity no longer needs webcam access
    cam.release()
    print("Returning detection: " + msg)
    return msg

# Currently unnecessary, uncomment after Unity no longer needs webcam
# @app.route("/closecamera")
# def closecamera():
#     global cam
#     print("Stopping video stream")
#     cam.release()
#     cam = None
#     cv2.destroyAllWindows()
#     return "VideoStream was closed."
