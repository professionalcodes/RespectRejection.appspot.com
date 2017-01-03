function mv_node_modules_in {
	directory=$1

	if [ -d "${directory}/node_modules" ]; then
		echo "[-] node modules exists at path ${directory}/node_modules"
	else
		echo "[+] Moving ~/Desktop/temp/node_modules to ${directory}/"
		mv ~/Desktop/temp/node_modules/ $directory/
	fi
}

function mv_node_modules_out {
	directory=$1

	if [ ! -d "${directory}/node_modules" ]; then
		echo "[-] node_modules does not exist in Directory ${directory}"
	else
		echo "[+] Moving ${directory}/node_modules to ~/Desktop/temp/"
		mv $directory/node_modules/ ~/Desktop/temp/
	fi
}

function compile_typescripts {
	for file in `ls *.ts`; do 
		tsc $file
	done;
}

function run_respectrejection {
	dev_appserver.py ~/OpenSource/CustomRejection/app.yaml 
}

function show_git_info {
	git_user_email=`git config user.email`
	git_username=`git config user.name`
	echo "${git_user_email}:${git_username}"
}