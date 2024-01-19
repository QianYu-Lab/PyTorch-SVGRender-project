import os
from moviepy.editor import VideoFileClip, vfx, ImageClip, concatenate_videoclips

input_video_path = "./vectorfusion/VF_rendering_stage1.mp4"
input_video_path2 = "./styleclipdraw/styleclipdraw_rendering.mp4"
output_gif_path = "./styleclipdraw/sheep.gif"

# Load videos
# video1 = VideoFileClip(input_video_path)
video2 = VideoFileClip(input_video_path2)

# Concatenate videos
concatenated_video = concatenate_videoclips([video2])

# If you want to crop the concatenated video, uncomment the following lines:
w, h = concatenated_video.size
min_size = min(w, h)
cropped_video = concatenated_video.crop(x_center=w/2, y_center=h/2, width=min_size, height=min_size)

final_video = cropped_video.fx(vfx.speedx, 2)

# Write the result to a GIF file
final_video.write_gif(output_gif_path, fps=final_video.fps)

# Optionally, remove the original videos after processing
# os.remove(input_video_path)
# os.remove(input_video_path2)