"use client";
import { useEffect, useState } from "react";
import { useVideoRec } from "@/hooks/useVideoRec";
import scss from "./VideoRec.module.scss";

const VideoRec = () => {
  if (typeof window === "undefined") return null;
  const { status, startRecording, stopRecording, mediaBlobUrl } = useVideoRec();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  // Сохранение видео в Base64 при появлении
  useEffect(() => {
    const saveVideoToLocalStorage = async () => {
      if (mediaBlobUrl) {
        const blob = await fetch(mediaBlobUrl).then((res) => res.blob());
        const reader = new FileReader();
        reader.onloadend = () => {
          localStorage.setItem("recordedVideoBase64", reader.result as string);
          setVideoUrl(mediaBlobUrl);
        };
        reader.readAsDataURL(blob);
      }
    };

    saveVideoToLocalStorage();
  }, [mediaBlobUrl]);

  // Восстановление видео из localStorage при загрузке
  useEffect(() => {
    if (typeof window !== "undefined") {
      const base64Video = localStorage.getItem("recordedVideoBase64");
      if (base64Video) {
        fetch(base64Video)
          .then((res) => res.blob())
          .then((blob) => {
            const url = URL.createObjectURL(blob);
            setVideoUrl(url);
          });
      }
    }
  }, []);
  

  // Функция для скачивания видео
  const handleDownload = () => {
    if (videoUrl) {
      const link = document.createElement("a");
      link.href = videoUrl;
      link.download = "recorded-video.mp4";
      link.click();
    } else {
      alert("Нет доступного видео для скачивания.");
    }
  };

  // Функция отправки видео в Telegram
  const sendToTelegram = async () => {
    if (!videoUrl) {
      alert("Нет доступного видео для отправки.");
      return;
    }

    try {
      const blob = await fetch(videoUrl).then((res) => res.blob());
      const formData = new FormData();
      formData.append("chat_id", "-1002155692436"); // ID группы
      formData.append("video", blob, "recorded-video.mp4");
      formData.append("caption", "Записанное видео");

      await fetch(
        `https://api.telegram.org/bot7379926721:AAGdHk5RpkeAFr5TOZApxisySaGqta-Lws4/sendVideo`,
        {
          method: "POST",
          body: formData,
        }
      );

      alert("Видео успешно отправлено в Telegram!");
    } catch (error) {
      console.error("Ошибка при отправке видео:", error);
      alert("Не удалось отправить видео в Telegram.");
    }
  };

  return (
    <div className={scss.recorder}>
      <div className={scss.bg}>
        <div className="container">
          <div className={scss.content}>
            <div className={scss.texts}>
              <p>{status}</p>
              <button onClick={startRecording}>Start Recording</button>
              <button onClick={stopRecording}>Stop Recording</button>
              <button onClick={handleDownload}>Download Video</button>
              <button onClick={sendToTelegram}>Send to Telegram</button>
            </div>
            {videoUrl ? (
              <video
                className={scss.video}
                src={videoUrl}
                controls
                autoPlay
                loop
              />
            ) : (
              <div className={scss.noneVideo}></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoRec;
