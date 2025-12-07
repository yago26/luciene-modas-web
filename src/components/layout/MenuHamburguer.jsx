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
  ShoppingCart,
} from "lucide-react";

export default function MenuHamburguer() {
  const [open, setOpen] = useState(false);
  const [openDropDown, setOpenDropDown] = useState(false);

  const router = useRouter();

  const handleClick = (caminho) => {
    setOpen(false);
    router.push(caminho);
  };

  const categoriasItems = [
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
        title="Menu"
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
        className={style.menu}
      >
        <div className={style.containerMenu}>
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
            menu={{ items: categoriasItems }}
            placement="bottomLeft"
            trigger={["click"]}
            open={openDropDown}
            onOpenChange={(value) => setOpenDropDown(value)}
          >
            <button className={style.itemMenu}>
              <List className={style.icone} />
              Categorias
              {openDropDown ? (
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
