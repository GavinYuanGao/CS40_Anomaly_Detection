
from optparse import OptionParser
from pathlib import Path
import os
import shutil


# gavin 来过
# harris 也来过 芜湖

def find_dangerous(all_id_file):
    with open(all_id_file, 'r', encoding='utf-8') as f:
        id_list = []
        for line in f:
            line = line.strip('\n').split('\t')
            is_dangerous = line[6]
            id = line[1]
            
            if (is_dangerous == 'True'):
                id_list.append(id)
        return id_list


def store_source_file_name(dir):
    source_file_list = []
    for file in dir.iterdir():
        source_file_list.append(file.stem)

    return source_file_list


def copy_file(source_file_name,source_dir,target_dir):
    shutil.copy(source_dir/Path(source_file_name),target_dir)

if __name__ == '__main__':

    parser = OptionParser()
    parser.add_option('-i', '--id_list', dest='id_list', default=None, action='store')
    parser.add_option('-s', '--source_dir', dest='source_dir', default=None, action='store')
    parser.add_option('-t', '--target_dir', dest='target_dir', default=None, action='store')
    parser.add_option('-f', '--input_suffix', dest='input_suffix', default=None, action='store')

    option, args = parser.parse_args()

    id_list = Path(option.id_list)
    source_dir = Path(option.source_dir)
    target_dir = Path(option.target_dir)
    input_suffix = str(option.input_suffix)

    target_dir.mkdir(exist_ok=True)


    dangerous_id_list = find_dangerous(id_list)
    #store_source_file_name(source_dir)

    for dangerous_id in dangerous_id_list:
        if dangerous_id in store_source_file_name(source_dir):
            source_file_name = dangerous_id + input_suffix
            copy_file(source_file_name,source_dir,target_dir)
