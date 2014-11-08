import json

accidents = []

reader = json.load(open("thoughtSpots.json"))
#for row in reader:
print reader[0]
