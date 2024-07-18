"use client";
import * as React from "react";

import Image from "next/image";
import { useState, useEffect } from "react";
import json from "./data.json";

import { Box, Container, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import VerbsFormDialog from "./components/VerbsFormDialog";

interface Verb {
  id: number;
  translation: string;
  infinitive: string;
  preterit: string;
  past_participle: string;
}

export default function Home() {
  const [rows, setRows] = useState<Verb[]>([]);

  // Fonction pour récupérer les données
  const fetchData = (): Promise<Verb[]> => {
    return fetch("http://localhost:8765/apis/getVerbs")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        return data;
      });
  };

  useEffect(() => {
    fetchData()
      .then((data) => {
        setRows(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleFormSubmit = (formData: Verb) => {
    console.log("Données du formulaire soumis :", formData);

    const newId = rows.length + 1;
    const newVerb: Verb = {
      id: newId,
      translation: formData.translation,
      infinitive: formData.infinitive,
      preterit: formData.preterit,
      past_participle: formData.past_participle,
    };
    setRows([...rows, newVerb]);
  };

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: "infinitive",
      headerName: "Infinitif",
      width: 150,
      editable: true,
    },
    {
      field: "preterit",
      headerName: "Prétérit",
      width: 110,
      editable: true,
    },
    {
      field: "past_participle",
      headerName: "Participe passé",
      sortable: false,
      width: 160,
    },
    {
      field: "translation",
      headerName: "Verbe",
      width: 150,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleDelete(params.id)}
        >
          Supprimer
        </Button>
      ),
    },
  ];

  return (
    <Container maxWidth="xl">
      <h1>Verbes irréguliers</h1>
      <div style={{ marginBottom: "1rem" }}>
        <VerbsFormDialog onSubmit={handleFormSubmit} />
      </div>

      <Box sx={{ height: "750px", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 20,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </Container>
  );
}
