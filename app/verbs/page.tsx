"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { Box, Container, Button } from "@mui/material";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";

import VerbsFormDialog from "./components/VerbsFormDialog";
import MultiDeleteFormDialog from "./components/MultiDeleteFormDialog";

interface Verb {
  id: number;
  translation: string;
  infinitive: string;
  preterit: string;
  past_participle: string;
}

export default function Home() {
  const [rows, setRows] = useState<Verb[]>([]);
  const [loader, setLoader] = useState<boolean>(true);
  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);

  // Fonction pour récupérer les données
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8765/apis/getVerbs");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setRows(data);
      setLoader(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function api(url, data, method) {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        //"X-CSRF-Token": csrfToken,
      },
      body: JSON.stringify(data),
      credentials: "include",
    });
    return response.json();
  }

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

  const handleEdit = (updatedRow) => {
    return api("http://localhost:8765/apis/editVerb", updatedRow, "PUT").then(
      (data) => {
        console.log(data.success);
        return data;
      }
    );
  };

  const handleDelete = (id) => {
    api("http://localhost:8765/apis/deleteVerb", { id: id }, "DELETE").then(
      (data) => {
        console.log(data);
        setRows(rows.filter((row) => row.id !== id));
      }
    );
  };

  const handleMultiDelete = () => {
    api(
      "http://localhost:8765/apis/deleteMultipleVerbs",
      rowSelectionModel,
      "DELETE"
    ).then((data) => {
      const remainingRows = rows.filter(
        (row) => !rowSelectionModel.includes(row.id)
      );
      console.log(data);
      setRows(remainingRows);
    });
  };

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: "infinitive",
      headerName: "Infinitif",
      width: 160,
      editable: true,
    },
    {
      field: "preterit",
      headerName: "Prétérit",
      width: 160,
      editable: true,
      sortable: false,
    },
    {
      field: "past_participle",
      headerName: "Participe passé",
      width: 160,
      editable: true,
      sortable: false,
    },
    {
      field: "translation",
      headerName: "Verbe",
      width: 160,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="warning"
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
      <div style={{ marginBottom: "1rem", display: "flex" }}>
        <VerbsFormDialog color="secondary" onSubmit={handleFormSubmit} />
        <MultiDeleteFormDialog
          selection={rowSelectionModel}
          onConfirm={handleMultiDelete}
        />
      </div>

      <Box sx={{ height: "750px", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loader}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 20,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          disableRowSelectionOnClick
          processRowUpdate={(updatedRow, originalRow) => {
            const edit = handleEdit(updatedRow);
            return edit ? updatedRow : originalRow;
          }}
        />
      </Box>
    </Container>
  );
}
