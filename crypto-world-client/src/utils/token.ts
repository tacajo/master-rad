import { IToken } from "../interfaces/token.interface";

export default function tokensMapping(tokens: { name: string; price: number; ico: number }[]): IToken[] {
  return tokens.map((token: { name: string; price: number; ico: number }) => {
    return {
      name: token.name,
      price: token.price,
      ico: token.ico,
    };
  });
}
