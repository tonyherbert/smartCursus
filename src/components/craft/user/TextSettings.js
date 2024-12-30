"use client";

import React from "react";
import { useNode } from "@craftjs/core";

// Paramètres pour personnaliser le bloc texte
export const TextSettings = () => {
  const {
    actions: { setProp },
    text,
    fontSize,
    color,
  } = useNode((node) => ({
    text: node.data.props.text,
    fontSize: node.data.props.fontSize,
    color: node.data.props.color,
  }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <label>Texte :</label>
      <input
        type="text"
        value={text}
        onChange={(e) => setProp((props) => (props.text = e.target.value))}
      />
      <label>Taille (px) :</label>
      <input
        type="number"
        value={fontSize}
        onChange={(e) => setProp((props) => (props.fontSize = e.target.value))}
      />
      <label>Couleur :</label>
      <input
        type="color"
        value={color}
        onChange={(e) => setProp((props) => (props.color = e.target.value))}
      />
    </div>
  );
};
