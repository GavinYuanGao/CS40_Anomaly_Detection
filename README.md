# CS40_Anomaly_Detection
## extract_file.py
Tool for split normal and abnormal image.</n>
Run the following script in the terminal: </n>
```python3
python extract_file.py -i <meta.txt> -s <source_directory> -t <target_directory> -f <file.suffix>
```
!!First line in meta.txt should be deleted, and check the file suffix in source directory.</n>
Example </n>
```python3
python extract_file.py -i .../COMPASS-XP/meta.txt -s .../COMPASS-XP/Photo -t .../COMPASS-XP/all_dangerous/Photo -f .jpg
```
The code both adapts path format in WIN and macOS.</n>
