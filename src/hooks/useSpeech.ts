/**
 * テキストを読み上げるためのカスタムフック
 */

export const useSpeech = () => {
  const speak = (text: string, lang: string = "en-US") => {
    // 進行中の音声をキャンセル(連打防止)
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // 音声リストを取得して最適な音声を選択
    const getBestVoice = () => {
      const voices = window.speechSynthesis.getVoices();

      //  Google US English(高品質) >  en-US完全一致 >  英語
      return (
        voices.find((v) => v.name.includes("Google") && v.lang === "en-US") ||
        voices.find((v) => v.lang === lang) ||
        voices.find((v) => v.lang.startsWith("en"))
      );
    };

    const voice = getBestVoice();

    if (voice) {
      utterance.voice = voice;
    }

    //  パラメータ設定
    utterance.lang = lang;
    utterance.rate = 1.0; // 速度
    utterance.pitch = 1.0; // 声の高さ

    //  実行
    window.speechSynthesis.speak(utterance);

    // デバッグ用（F12コンソールで確認できるわ）
    console.log("Speaking with:", voice ? voice.name : "Default Voice");
  };

  return { speak };
};
