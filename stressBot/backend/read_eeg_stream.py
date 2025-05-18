# # Import modules to connect to EEG, analyze signals, and communicate with backend
# # This will: connect muse EEG stream, collect 5 sec of EEG data,
# #  calculate alpha/beta ratio to estimate stress
# #  send the estimated stress level to Flask backend
# import asyncio
#
# from pylsl import StreamInlet, resolve_streams
# import time
# import numpy as np
# from scipy.signal import welch
# from threading import Thread, Event
#
# # --- STEP 1: Connect to EEG stream via LSL ---
#
# print("Looking for EEG stream...")
# streams = resolve_streams()
# eeg_stream = next((s for s in streams if s.type() == "EEG"), None)
#
# if eeg_stream is not None:
#     print(f"Connected to stream: {eeg_stream.name()}")
#     inlet = StreamInlet(eeg_stream)
# else:
#     print("="*80)
#     print("No EEG stream found.")
#     print("="*80)
#     print("USING FAKE DATA")
#     print("="*80)
#     inlet = None
#
#
#
#
# # --- STEP 2: Collect EEG data for 5 seconds ---
#
# FS = 256  # Sampling rate (Hz)
# DURATION = 2
# NUM_CHANNELS = 4  # Muse has 4 EEG channels (TP9, AF7, AF8, TP10)
# LEFT_CHANNELS = range(0,2)
# RIGHT_CHANNELS = range(2,4)
#
# latest_reading = None
# stop_event = Event()
#
# def get_sample():
#     if inlet is None:
#         return None
#     eeg_data = []  # will store all samples
#
#     start_time = time.time()
#     while time.time() - start_time < DURATION:
#         sample, _ = inlet.pull_sample()
#         eeg_data.append(sample[:NUM_CHANNELS])  # store only the first 4 channels
#
#     eeg_data = np.array(eeg_data)
#     return eeg_data
#
# # --- STEP 3: Analyze data (alpha/beta power ratio) ---
#
# def background_update():
#     global stop_event
#     global latest_reading
#     while not stop_event.is_set():
#         latest_reading = get_sample()
#
# def start_readings():
#     t = Thread(target=background_update, daemon=True)
#     t.start()
# def stop_readings():
#     stop_event.set()
# def get_latest_reading():
#     global latest_reading
#     return latest_reading
#
# def bandpower(data, band, fs):
#     freqs, psd = welch(data, fs=fs, nperseg=fs*2)
#     idx = np.logical_and(freqs >= band[0], freqs <= band[1])
#     return np.mean(psd[idx])
#
# def calculate_traits():
#     eeg_data = get_latest_reading() #get_sample()
#     if inlet is None:
#         stress_ratio, meditative_ratio, creativity_ratio, ambition_ratio = (-1,-1,-1,-1)
#     elif eeg_data is None:
#         stress_ratio, meditative_ratio, creativity_ratio, ambition_ratio = 0,0,0,0
#     else:
#         # Calculate alpha and beta power across all channels
#         delta_power = np.mean([bandpower(eeg_data[:, ch], (0, 3), FS) for ch in range(NUM_CHANNELS)]) #no stable use
#         theta_power = np.mean([bandpower(eeg_data[:, ch], (4, 7), FS) for ch in range(NUM_CHANNELS)])
#         alpha_power = np.mean([bandpower(eeg_data[:, ch], (8, 12), FS) for ch in range(NUM_CHANNELS)])
#         beta_power  = np.mean([bandpower(eeg_data[:, ch], (13, 31), FS) for ch in range(NUM_CHANNELS)])
#         gamma_power = np.mean([bandpower(eeg_data[:, ch], (32, 100), FS) for ch in range(NUM_CHANNELS)]) #no stable use
#
#         alpha_left_pwr = np.mean([bandpower(eeg_data[:, ch], (8, 12), FS) for ch in LEFT_CHANNELS])
#         alpha_right_pwr = np.mean([bandpower(eeg_data[:, ch], (8, 12), FS) for ch in RIGHT_CHANNELS])
#
#
#         stress_ratio = alpha_power / beta_power ## smaller ratio = higher stress
#         meditative_ratio = alpha_power / theta_power ## smaller ratio = deeper meditative state
#         creativity_ratio = theta_power / beta_power ## increases during creative flow
#         ambition_ratio = alpha_right_pwr - alpha_left_pwr ## negative = +ambitious (approach); positive = -ambitious (withdrawal)
#
#         # # Determine stress level based on alpha/beta ratio
#         # if stress_ratio < 1:
#         #     stress_level = "high"
#         # elif stress_ratio < 1.5:
#         #     stress_level = "mild"
#         # else:
#         #     stress_level = "normal"
#
#     # print(f"Alpha/Beta ratio: {stress_ratio:.2f} → Stress level: {stress_level}")
#     return stress_ratio, meditative_ratio, creativity_ratio, ambition_ratio


import time
import numpy as np
from threading import Thread, Event
from pylsl import StreamInlet, resolve_streams
from scipy.signal import welch

# --- STEP 1: Connect to EEG stream via LSL ---

print("Looking for EEG stream...")
streams = resolve_streams()
eeg_stream = next((s for s in streams if s.type() == "EEG"), None)

if eeg_stream is not None:
    print(f"✅ Connected to stream: {eeg_stream.name()}")
    inlet = StreamInlet(eeg_stream)
else:
    print("=" * 80)
    print("⚠️  No EEG stream found.")
    print("=" * 80)
    print("⚠️  USING FAKE DATA")
    print("=" * 80)
    inlet = None

# --- Global Settings ---
FS = 256                # Sampling rate (Hz)
DURATION = 2            # Duration of data to collect per sample (in seconds)
NUM_CHANNELS = 4        # Muse EEG channels: TP9, AF7, AF8, TP10
LEFT_CHANNELS = range(0, 2)
RIGHT_CHANNELS = range(2, 4)

# Store the latest EEG sample globally
latest_reading = None
stop_event = Event()

# --- Get EEG sample for current window ---
def get_sample():
    if inlet is None:
        return None
    eeg_data = []
    start_time = time.time()
    while time.time() - start_time < DURATION:
        sample, _ = inlet.pull_sample()
        eeg_data.append(sample[:NUM_CHANNELS])  # Only the 4 EEG channels
    return np.array(eeg_data)

# --- Background thread that constantly updates EEG reading ---
def background_update():
    global latest_reading
    while not stop_event.is_set():
        latest_reading = get_sample()

# --- Starts EEG background thread ---
def start_readings():
    stop_event.clear()
    t = Thread(target=background_update, daemon=True)
    t.start()

# --- Stops the background reading thread ---
def stop_readings():
    stop_event.set()

# --- Provides access to latest EEG data ---
def get_latest_reading():
    global latest_reading
    return latest_reading

# --- Helper function: power in given frequency band ---
def bandpower(data, band, fs):
    freqs, psd = welch(data, fs=fs, nperseg=fs*2)
    idx = np.logical_and(freqs >= band[0], freqs <= band[1])
    return np.mean(psd[idx])

# --- Analyze EEG and return ratios ---
def calculate_traits():
    eeg_data = get_latest_reading()

    if inlet is None:
        # Fake data placeholder
        return (-1, -1, -1, -1)
    elif eeg_data is None:
        return (0, 0, 0, 0)
    else:
        # Calculate power in common EEG bands
        theta_power = np.mean([bandpower(eeg_data[:, ch], (4, 7), FS) for ch in range(NUM_CHANNELS)])
        alpha_power = np.mean([bandpower(eeg_data[:, ch], (8, 12), FS) for ch in range(NUM_CHANNELS)])
        beta_power = np.mean([bandpower(eeg_data[:, ch], (13, 30), FS) for ch in range(NUM_CHANNELS)])

        alpha_left = np.mean([bandpower(eeg_data[:, ch], (8, 12), FS) for ch in LEFT_CHANNELS])
        alpha_right = np.mean([bandpower(eeg_data[:, ch], (8, 12), FS) for ch in RIGHT_CHANNELS])

        # Ratios to estimate traits
        stress_ratio = alpha_power / beta_power            # Lower = more stress
        meditative_ratio = alpha_power / theta_power       # Higher = more meditative
        creativity_ratio = theta_power / beta_power        # Higher = creative flow
        ambition_ratio = alpha_right - alpha_left          # Negative = ambitious

        return (stress_ratio, meditative_ratio, creativity_ratio, ambition_ratio)
