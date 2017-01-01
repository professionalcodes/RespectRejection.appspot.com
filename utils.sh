function mv_node_modules {
	cp node_modules/ -r
}

function show_git_info {
	git_user_email=`git config user.email`
	git_username=`git config user.name`
}