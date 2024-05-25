import axios from 'axios';
import * as process from 'process';
import * as dotenv from 'dotenv';
dotenv.config();

const token = process.env.JWT_TOKEN;

interface Address {
  cep: string;
  logradouro: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
  numero: string;
}

const addressData: Address[] = [
  {
    cep: '12345-678',
    logradouro: 'Rua Exemplo 1',
    complemento: 'Apto 101',
    bairro: 'Bairro 1',
    cidade: 'Cidade 1',
    uf: 'SP',
    numero: '123',
  },
  {
    cep: '98765-432',
    logradouro: 'Rua Exemplo 2',
    bairro: 'Bairro 2',
    cidade: 'Cidade 2',
    uf: 'RJ',
    numero: '456',
  },
  {
    cep: '11111-222',
    logradouro: 'Rua Exemplo 3',
    complemento: 'Casa 3',
    bairro: 'Bairro 3',
    cidade: 'Cidade 3',
    uf: 'MG',
    numero: '789',
  },
];

async function createAddress(address: Address) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.post(
        `http://localhost:3000/address/novoEndereco`,
        address,
        config,
    );
    console.log('Endereço criado com sucesso:', response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Erro ao criar endereço:', error.response?.data);
    } else {
      console.error('Erro desconhecido:', error);
    }
  }
}

async function sendAddressData() {
  for (const address of addressData) {
    await createAddress(address);
  }
}

sendAddressData();