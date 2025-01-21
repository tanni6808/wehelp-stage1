import ssl
import urllib.request as req
import json
ssl._create_default_https_context = ssl._create_unverified_context
src1='https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment-1'
src2='https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment-2'

with req.urlopen(src1) as response:
    data1=json.load(response)
with req.urlopen(src2) as response:
    data2=json.load(response)
spot_list = data1["data"]["results"]
spot_info = data2["data"]
# print(spot_list[0])
# print(data2['data'][0])
def find_district(spot):
    serial_no=spot['SERIAL_NO']
    full_address=''
    for spot in spot_info:
        if spot['SERIAL_NO']==serial_no:
            full_address=spot['address']
            break
    return full_address[5:8]

def find_first_image_url(spot):
    return spot['filelist'].split('jpg')[0]+'jpg'

current_spot = spot_list[0]
write_list=[current_spot['stitle'], find_district(current_spot), current_spot['longitude'], current_spot['latitude'], find_first_image_url(current_spot)]
print(write_list)