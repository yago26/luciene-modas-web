const fakeCategories = [
  {
    id: 1,
    nome: "Masculino",
  },
  {
    id: 2,
    nome: "Feminino",
  },
  {
    id: 3,
    nome: "Infantil",
  },
  {
    id: 4,
    nome: "Cosméticos",
  },
];

const fakeConsumer = [
  {
    id: 1,
    nome: "Yago Jordas",
    email: "yago.jordas@academico.ifpb.edu.br",
    senha: "12345y",
    genero: "Masculino",
    cep: "5814000",
  },
  {
    id: 2,
    nome: "Luciene Izidro",
    email: "lucieneizidro@gmail.com",
    senha: "12345l",
    genero: "Feminino",
    cep: "5814000",
  },
];

// adicionar desconto em cada um dos produtos
const fakeProducts = [
  {
    id: 1,
    nome: "Kit 3x Cueca Boxer Masculina",
    sobre:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam posuere imperdiet eros, vel aliquam elit.",
    valor: "$49,90",
    tamanho: "M",
    url: "https://images.tcdn.com.br/img/img_prod/475018/kit_3_cuecas_boxer_di_nuevo_100_algodao_premium_azul_preto_e_branco_5774_1_f83fe72e03686f5db444571f26321618_20230601173859.jpg",
    estoque: 5,
    desconto: 0.0,
  },
  {
    id: 2,
    nome: "Cueca Boxer Masculina",
    sobre:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam posuere imperdiet eros, vel aliquam elit.",
    valor: "$20,90",
    tamanho: "G",
    url: "https://images.tcdn.com.br/img/img_prod/475018/cueca_box_boxer_em_algodao_macio_di_nuevo_6183_1_d82d52e7e23f045b8a4e282099bfc3ca.jpg",
    estoque: 10,
  },
  {
    id: 3,
    nome: "Kit 3x Cueca Boxer Masculina",
    sobre:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam posuere imperdiet eros, vel aliquam elit.",
    valor: "$49,90",
    tamanho: "M",
    url: "https://images.tcdn.com.br/img/img_prod/475018/kit_3_cuecas_boxer_di_nuevo_100_algodao_premium_azul_preto_e_branco_5774_1_f83fe72e03686f5db444571f26321618_20230601173859.jpg",
    estoque: 12,
  },
  {
    id: 4,
    nome: "Kit 3x Cueca Boxer Masculina",
    sobre:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam posuere imperdiet eros, vel aliquam elit.",
    valor: "$49,90",
    tamanho: "M",
    url: "https://images.tcdn.com.br/img/img_prod/475018/kit_3_cuecas_boxer_di_nuevo_100_algodao_premium_azul_preto_e_branco_5774_1_f83fe72e03686f5db444571f26321618_20230601173859.jpg",
    estoque: 2,
  },
  {
    id: 5,
    nome: "Kit 3x Cueca Boxer Masculina",
    sobre:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam posuere imperdiet eros, vel aliquam elit.",
    valor: "$49,90",
    tamanho: "M",
    url: "https://images.tcdn.com.br/img/img_prod/475018/kit_3_cuecas_boxer_di_nuevo_100_algodao_premium_azul_preto_e_branco_5774_1_f83fe72e03686f5db444571f26321618_20230601173859.jpg",
    estoque: 1,
  },
  {
    id: 6,
    nome: "Kit 3x Cueca Boxer Masculina",
    sobre:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam posuere imperdiet eros, vel aliquam elit.",
    valor: "$49,90",
    tamanho: "M",
    url: "https://images.tcdn.com.br/img/img_prod/475018/kit_3_cuecas_boxer_di_nuevo_100_algodao_premium_azul_preto_e_branco_5774_1_f83fe72e03686f5db444571f26321618_20230601173859.jpg",
    estoque: 20,
  },
  {
    id: 7,
    nome: "Kit 3x Cueca Boxer Masculina",
    sobre:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam posuere imperdiet eros, vel aliquam elit.",
    valor: "$49,90",
    tamanho: "M",
    url: "https://images.tcdn.com.br/img/img_prod/475018/kit_3_cuecas_boxer_di_nuevo_100_algodao_premium_azul_preto_e_branco_5774_1_f83fe72e03686f5db444571f26321618_20230601173859.jpg",
    estoque: 3,
  },
  {
    id: 8,
    nome: "Kit 3x Cueca Boxer Masculina",
    sobre:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam posuere imperdiet eros, vel aliquam elit.",
    valor: "$49,90",
    tamanho: "M",
    url: "https://images.tcdn.com.br/img/img_prod/475018/kit_3_cuecas_boxer_di_nuevo_100_algodao_premium_azul_preto_e_branco_5774_1_f83fe72e03686f5db444571f26321618_20230601173859.jpg",
    estoque: 8,
  },
  {
    id: 9,
    nome: "Kit 3x Cueca Boxer Masculina",
    sobre:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam posuere imperdiet eros, vel aliquam elit.",
    valor: "$49,90",
    tamanho: "M",
    url: "https://images.tcdn.com.br/img/img_prod/475018/kit_3_cuecas_boxer_di_nuevo_100_algodao_premium_azul_preto_e_branco_5774_1_f83fe72e03686f5db444571f26321618_20230601173859.jpg",
    estoque: 5,
  },
  {
    id: 10,
    nome: "Kit 3x Cueca Boxer Masculina",
    sobre:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam posuere imperdiet eros, vel aliquam elit.",
    valor: "$49,90",
    tamanho: "M",
    url: "https://images.tcdn.com.br/img/img_prod/475018/kit_3_cuecas_boxer_di_nuevo_100_algodao_premium_azul_preto_e_branco_5774_1_f83fe72e03686f5db444571f26321618_20230601173859.jpg",
    estoque: 3,
  },
];

const fakeSale = [];

const fakeShopCar = [
  {
    id: 1,
    id_products: [1, 2, 3],
  },
  {
    id: 2,
    id_products: [1, 5, 8],
  },
];

const fakeCategoriesProducts = [
  {
    id_categories: 1,
    id_product: 1,
  },
  {
    id_categories: 1,
    id_product: 2,
  },
  {
    id_categories: 2,
    id_product: 3,
  },
  {
    id_categories: 2,
    id_product: 4,
  },
  {
    id_categories: 3,
    id_product: 5,
  },
  {
    id_categories: 3,
    id_product: 6,
  },
  {
    id_categories: 4,
    id_product: 7,
  },
  {
    id_categories: 4,
    id_product: 8,
  },
  {
    id_categories: 4,
    id_product: 9,
  },
  {
    id_categories: 4,
    id_product: 10,
  },
];

const fakeBuy = [];

export {
  fakeCategories,
  fakeConsumer,
  fakeProducts,
  fakeSale,
  fakeShopCar,
  fakeCategoriesProducts,
  fakeBuy,
};
