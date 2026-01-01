import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

export async function generateTitle(originalTitle: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
以下の漫画のタイトルを、より魅力的に、より多くの読者を引きつけるタイトルに書き換えてください。
元のタイトル: ${originalTitle}

書き換えのルール:
- 日本語で応答
- 30文字以内で返す
- 魅的で、読者がつい開きたくなる表現を使う
- 元の意味を保ちつつ、洗練された表現にする
- 漫画らしいジャンル感（ギャグ、日常、バトルなど）を残す
- 「速報」「衝撃」「朗報」「悲報」などのフックワードを適宜入れる
- タイトルだけ返す。引用符や説明は不要
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const generatedTitle = response.text().trim();

    return generatedTitle;
  } catch (error) {
    console.error("AI title generation error:", error);
    throw new Error("タイトル生成に失敗しました");
  }
}
