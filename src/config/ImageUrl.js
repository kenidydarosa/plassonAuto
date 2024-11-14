// Função para gerar a URL da imagem com base no imgKey do veículo
export const getImageUrl = (imgKey) => {
  // A chave do arquivo já vem sem o 'o/' (prefixo do Firebase Storage)
  return `https://firebasestorage.googleapis.com/v0/b/plassonauto-7e0c1.firebasestorage.app/o/images%2F${imgKey}?alt=media`;
};