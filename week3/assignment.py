# import ssl
import urllib.request as req
import json
import csv
# ssl._create_default_https_context = ssl._create_unverified_context
src1='https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment-1'
src2='https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment-2'

with req.urlopen(src1) as response:
    data1=json.load(response)
with req.urlopen(src2) as response:
    data2=json.load(response)
spots_raw_list = data1["data"]["results"]
spots_traffic = data2["data"]
# print(spots_raw_list[0])
# print(data2['data'][0])
def find_district(spot):
    serial_no=spot['SERIAL_NO']
    full_address=''
    for spot in spots_traffic:
        if spot['SERIAL_NO']==serial_no:
            full_address=spot['address']
            break
    return full_address[5:8]

def find_first_image_url(spot):
    filelist=spot['filelist']
    i=filelist.find('https:', 1, -1)
    return filelist[0:i]

def find_spot(serial_no):
    for spot in spots_raw_list:
        if spot['SERIAL_NO']==serial_no:
            return spot

spots_list=[]
for spot in spots_raw_list:
    write_list=[spot['stitle'], find_district(spot), spot['longitude'], spot['latitude'], find_first_image_url(spot)]
    spots_list.append(write_list)


with open('spot.csv', 'w', newline='', encoding='utf-8') as csvfile:
    writer=csv.writer(csvfile)
    writer.writerows(spots_list)


# a list of mrt stations
mrt_station_list=list({spot['MRT']: spot for spot in spots_traffic})
# a list to store nearby spots 
mrt_list=[]
for mrt_station in mrt_station_list:
    mrt_list.append([mrt_station])

for mrt in mrt_list:
    for spot in spots_traffic:
        if spot['MRT']==mrt[0]:
            mrt.append(find_spot(spot['SERIAL_NO'])['stitle'])


with open('mrt.csv', 'w', newline='', encoding='utf-8') as csvfile:
    writer=csv.writer(csvfile)
    writer.writerows(mrt_list)