import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "node:path";

// Deploy: Etapa 1
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const distPath = path.resolve(__dirname, "../../front-end/dist");

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

// Deploy: Etapa 2
app.use(express.static(distPath));

// Criar produto
app.post("/api/produtos", async (req, res) => {
  const {
    titulo,
    preco,
    precoDesconto,
    precoParcelado,
    caracteristicas,
    imagens,
    estoque,
    freteGratis,
    full,
  } = req.body;

  try {
    const novo = await prisma.produto.create({
      data: {
        titulo,
        preco,
        precoDesconto,
        precoParcelado,
        caracteristicas: JSON.stringify(caracteristicas),
        imagens: JSON.stringify(imagens),
        estoque,
        freteGratis,
        full,
      },
    });

    res.json(novo);
  } catch (err) {
    res.status(400).json({ erro: "Erro ao criar o produto" });
  }
});

// Listar produtos
app.get("/api/produtos", async (req, res) => {
  const todos = await prisma.produto.findMany();

  res.json(todos);
});

// Listar produto específico
app.get("/api/produtos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const produto = await prisma.produto.findUnique({
      where: { id: Number(id) },
    });

    res.json(produto);
  } catch (error) {
    res.status(404).json({ error: "Produto não foi encontrado" });
  }
});

// Deletar produto específico
app.delete("/api/produtos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const produto = await prisma.produto.delete({
      where: { id: Number(id) },
    });

    res.json(produto);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});

// Editar produto específico
app.put("/api/produtos/:id", async (req, res) => {
  const { id } = req.params;
  const {
    titulo,
    preco,
    precoDesconto,
    precoParcelado,
    caracteristicas,
    imagens,
    estoque,
    freteGratis,
    full,
  } = req.body;

  try {
    const produto = await prisma.produto.update({
      where: { id: Number(id) },
      data: {
        titulo,
        preco,
        precoDesconto,
        precoParcelado,
        caracteristicas: JSON.stringify(caracteristicas),
        imagens: JSON.stringify(imagens),
        estoque,
        freteGratis,
        full,
      },
    });

    res.json(produto);
  } catch (error) {
    res.status(404).json({
      error: error,
      message: "Deu problema na hora de fazer o update",
    });
  }
});

// Criar pedido
app.post("/api/pedidos", async (req, res) => {
  const { cartItems, valorTotal } = req.body;

  try {
    const pedido = await prisma.pedido.create({
      data: {
        valorTotal,
        itensVenda: JSON.stringify(cartItems),
      },
    });

    res.json(pedido);
  } catch (error) {
    res.status(404).json({
      error: error,
      message: "Deu problema na hora de criar o pedido",
    });
  }
});

// Listar pedidos
app.get("/api/pedidos", async (req, res) => {
  try {
    const pedidos = await prisma.pedido.findMany();

    res.json(pedidos);
  } catch (error) {
    res.status(404).json({
      error: error,
      message: "Deu problema ao listar os pedidos",
    });
  }
});

// Deploy: Etapa 3
app.get((req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
