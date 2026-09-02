import {
  getPlaybackProgress,
  resolveResumeTime,
} from "@/lib/playback/progress-storage";

export const movieWatchButtonLabel = (contentId: number): "Reproducir" | "Continuar" => {
  const resumeTime = resolveResumeTime(
    getPlaybackProgress({ mediaType: "movie", contentId }),
  );
  return resumeTime > 0 ? "Continuar" : "Reproducir";
};
