"use client";

import { useState } from "react";
import { Drawer, Button, Dropdown } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import style from "./menuHamburguer.module.css";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  ChevronUp,
  CircleUserRound,
  House,
  List,
  LogOut,
  Package,
  ShieldCheck,
  ShoppingCart,
} from "lucide-react";

export default function MenuHamburguer() {
  const [open, setOpen] = useState(false);
  const [openDropDown_categoriesItems, setOpenDropDown_categoriesItems] =
    useState(false);
  const [
    openDropDown_adminFunctionsItems,
    setOpenDropDown_adminFunctionsItems,
  ] = useState(false);

  const router = useRouter();

  const handleClick = (caminho) => {
    setOpen(false);
    router.push(caminho);
  };

  const categoriesItems = [
    { key: "roupas", label: "Roupas" },
    { key: "cosmeticos", label: "Cosméticos" },
    { key: "masculino", label: "Masculino" },
    { key: "feminino", label: "Feminino" },
    { key: "infantil", label: "Infantil" },
    { key: "outros", label: "Outros" },
  ].map((cat) => ({
    ...cat,
    onClick: () => {
      setOpen(false);
      router.push(`/categorias/${cat.key}`);
    },
  }));

  const adminFunctionsItems = [
    { key: "", label: "Home" },
    { key: "painel-analise", label: "Painel de análise" },
    { key: "adicionar-produtos", label: "Adicionar produtos" },
    { key: "produtos-esgotados", label: "Produtos esgotados" },
    { key: "gerenciar-pedidos", label: "Gerenciar pedidos" },
  ].map((cat) => ({
    ...cat,
    onClick: () => {
      setOpen(false);
      router.push(`/admin/${cat.key}`);
    },
  }));

  const logout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <>
      <Button
        type="text"
        icon={<MenuOutlined />}
        style={{ fontSize: 30, color: "var(--cor-terciaria)" }}
        onClick={() => setOpen(true)}
      />

      <Drawer
        title="Luciene Modas"
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
        className={style.menu}
      >
        <div className={style.containerMenu}>
          <Dropdown
            menu={{ items: adminFunctionsItems }}
            placement="bottomLeft"
            trigger={["click"]}
            open={openDropDown_adminFunctionsItems}
            onOpenChange={(value) => setOpenDropDown_adminFunctionsItems(value)}
          >
            <button className={style.itemMenu}>
              <ShieldCheck className={style.icone} />
              Admin
              {openDropDown_adminFunctionsItems ? (
                <ChevronDown className={style.icone} />
              ) : (
                <ChevronUp className={style.icone} />
              )}
            </button>
          </Dropdown>

          <button className={style.itemMenu} onClick={() => handleClick("/")}>
            <House className={style.icone} />
            Home
          </button>

          <button
            className={style.itemMenu}
            onClick={() => handleClick("/perfil")}
          >
            <CircleUserRound className={style.icone} />
            Perfil
          </button>

          <button
            className={style.itemMenu}
            onClick={() => handleClick("/meus-pedidos")}
          >
            <Package className={style.icone} />
            Meus pedidos
          </button>

          <button
            className={style.itemMenu}
            onClick={() => handleClick("/carrinho")}
          >
            <ShoppingCart className={style.icone} />
            Carrinho
          </button>

          <Dropdown
            placement="bottomLeft"
            menu={{ items: categoriesItems }}
            trigger={["click"]}
            open={openDropDown_categoriesItems}
            onOpenChange={(value) => setOpenDropDown_categoriesItems(value)}
          >
            <button className={style.itemMenu}>
              <List className={style.icone} />
              Categorias
              {openDropDown_categoriesItems ? (
                <ChevronDown className={style.icone} />
              ) : (
                <ChevronUp className={style.icone} />
              )}
            </button>
          </Dropdown>

          <button onClick={logout} className={`${style.itemMenu}`}>
            <LogOut className={style.icone} />
            Sair
          </button>
        </div>
      </Drawer>
    </>
  );
}
