#!/bin/bash

#Function to start play framework process
#	Usage: startPlayFramework
#	Return:
#		0 on success
#		!= 0 on error
function startPlayFramework {
	(
		cd "$OCD_HOME"
		cd bin
        sh open-content-discovery-tool -Dconfig.file=../conf/int/int.conf &
		return $?
	)
}

#Global variables
OCD_HOME="/opt/producer-ocd/open-content-discovery-tool-0.1-SNAPSHOT"		#Path to project folder
SCRIPT_LOG="/opt/producer-ocd/script.log"					#Log file for this script

#START

#Start Play Framework
startPlayFramework