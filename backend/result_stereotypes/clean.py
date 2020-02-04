with open('stereotypen_profession.txt','r+') as f:
    read_data=f.read()
    data=read_data.replace('"', '')
    f.seek(0)
    f.write(data)
