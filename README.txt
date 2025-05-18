Stress Robot
This emotionally intelligent robot provides users a place to be heard without their explicit active use. By reading emotional states in real time, our robot adapts its behavior to support the user.
We display the stress levels clearly through our frontend. 

Overview on Methodology
We read brain activity using the MUSE headband and categorize stress levels (0-1, 1-2, 3+) using alpha and beta waves. We define a function of stress dependent on the ratio of alpha:beta and 
a fit using 2 key data points. We develop a smooth download curve sensitive around 1.0-2.0.
The user can see data on their stress levels via our frontend, as well as the differences between their right and left alpha powers that indicate levels of ambition (R-L<0) and withdrawal (R-L>0).
Our physical robot is built using raspberry pi. By connecting to our backend and using text-to-speech, our robot also speaks to the user in real time. 

Resources
https://github.com/alexandrebarachant/muse-lsl - connecting to the MUSE headband and streaming EEG data via bluetooth
https://github.com/chkothe/pylsl - for listening to the real time data streams
