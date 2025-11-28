import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const EditOnderzoek = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [themes, setThemes] = useState([
    "Klimaatverandering",
    "Overstromingen",
    "Natuur",
  ]);

  const [newTheme, setNewTheme] = useState("");

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:3000/api/reports/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Kon onderzoek niet laden");

        const data = await res.json();
        // Ensure fields exist
        data.sources = data.sources || [""];
        data.sections = data.sections || [
          {
            title: "",
            type: "text",
            content: "",
            files: [],
            youtube: "",
            modernSources: [""],
          },
        ];

        setFormData(data);
      } catch (e) {
        setError(e.message);
      }
    };

    load();
  }, [id]);

  const styles = {
    container: { padding: "2rem", maxWidth: "900px", margin: "0 auto" },
    panel: {
      background: "#f8f8f8",
      padding: "1.5rem",
      borderRadius: "8px",
      border: "1px solid #ddd",
    },
    label: { display: "block", margin: "0.7rem 0 0.2rem", fontWeight: 600 },
    input: {
      width: "100%",
      padding: "0.6rem",
      borderRadius: "5px",
      border: "1px solid #ccc",
      marginBottom: "0.6rem",
    },
    select: {
      width: "100%",
      padding: "0.6rem",
      borderRadius: "5px",
      border: "1px solid #ccc",
      marginBottom: "0.6rem",
    },
    textarea: {
      width: "100%",
      minHeight: "120px",
      padding: "0.6rem",
      borderRadius: "5px",
      border: "1px solid #ccc",
      marginBottom: "0.6rem",
    },
    sectionBox: {
      background: "#fff",
      border: "1px solid #ccc",
      padding: "1rem",
      borderRadius: "8px",
      marginBottom: "1rem",
    },
    btn: {
      padding: "0.6rem 1rem",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginRight: "0.5rem",
      fontWeight: 600,
    },
    primary: { background: "#0077ff", color: "white" },
    danger: { background: "#d9534f", color: "white" },
    cancel: { background: "#aaa", color: "white" },
    alert: { padding: "0.7rem", borderRadius: "5px", marginBottom: "1rem" },
  };

  const uploadFiles = async (index, fileList) => {
    try {
      const fd = new FormData();
      const token = localStorage.getItem("token");

      Array.from(fileList).forEach((f) => fd.append("files", f));

      const res = await fetch("http://localhost:3000/api/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });

      if (!res.ok) throw new Error("Upload mislukt");

      const data = await res.json();

      const updated = [...formData.sections];
      updated[index].files = [...updated[index].files, ...data.files];

      setFormData((p) => ({ ...p, sections: updated }));
    } catch (err) {
      setError(err.message);
    }
  };

  const saveReport = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:3000/api/reports/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      let backend = null;
      try {
        backend = await res.json();
      } catch {
        backend = null;
      }

      if (!res.ok) {
        throw new Error(
          backend?.error ||
            backend?.message ||
            `Opslaan mislukt (HTTP ${res.status})`
        );
      }

      setSuccess("Onderzoek opgeslagen!");
      setTimeout(() => navigate("/config"), 1000);
    } catch (err) {
      setError(err.message);
    }
  };

  if (!formData) return <div style={{ padding: 20 }}>Laden…</div>;

  return (
    <div style={styles.container}>
      <h1>Onderzoek bewerken</h1>

      {error && (
        <div style={{ ...styles.alert, background: "#ffdddd", color: "#900" }}>
          {error}
        </div>
      )}
      {success && (
        <div style={{ ...styles.alert, background: "#ddffdd", color: "#060" }}>
          {success}
        </div>
      )}

      <div style={styles.panel}>
        <form onSubmit={saveReport}>
          <label style={styles.label}>Titel</label>
          <input
            style={styles.input}
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          <label style={styles.label}>Thema</label>
          <select
            style={styles.select}
            value={formData.theme}
            onChange={(e) =>
              setFormData({ ...formData, theme: e.target.value })
            }
          >
            <option value="">Kies een thema…</option>
            {themes.map((t, i) => (
              <option key={i} value={t}>
                {t}
              </option>
            ))}
          </select>

          <input
            style={styles.input}
            placeholder="Nieuw thema toevoegen…"
            value={newTheme}
            onChange={(e) => setNewTheme(e.target.value)}
          />

          <button
            type="button"
            style={{ ...styles.btn, ...styles.primary }}
            onClick={() => {
              if (newTheme.trim()) {
                setThemes([...themes, newTheme.trim()]);
                setNewTheme("");
              }
            }}
          >
            + Thema toevoegen
          </button>

          <label style={styles.label}>Jaar</label>
          <input
            style={styles.input}
            type="number"
            value={formData.year}
            onChange={(e) =>
              setFormData({ ...formData, year: e.target.value })
            }
          />

          <label style={styles.label}>Samenvatting</label>
          <textarea
            style={styles.textarea}
            value={formData.summary}
            onChange={(e) =>
              setFormData({ ...formData, summary: e.target.value })
            }
          />

          <h2 style={{ marginTop: "1rem" }}>Secties</h2>

          {formData.sections.map((sec, index) => (
            <div key={index} style={styles.sectionBox}>
              <label style={styles.label}>Sectietitel</label>
              <input
                style={styles.input}
                value={sec.title}
                onChange={(e) => {
                  const arr = [...formData.sections];
                  arr[index].title = e.target.value;
                  setFormData({ ...formData, sections: arr });
                }}
              />

              <label style={styles.label}>Type</label>
              <select
                style={styles.select}
                value={sec.type}
                onChange={(e) => {
                  const arr = [...formData.sections];
                  arr[index].type = e.target.value;
                  setFormData({ ...formData, sections: arr });
                }}
              >
                <option value="text">Tekst</option>
                <option value="image">Foto</option>
                <option value="video">Video</option>
                <option value="youtube">YouTube</option>
              </select>

              {sec.type === "text" && (
                <>
                  <label style={styles.label}>Tekst</label>
                  <textarea
                    style={styles.textarea}
                    value={sec.content}
                    onChange={(e) => {
                      const arr = [...formData.sections];
                      arr[index].content = e.target.value;
                      setFormData({ ...formData, sections: arr });
                    }}
                  />
                </>
              )}

              {(sec.type === "image" || sec.type === "video") && (
                <>
                  <label style={styles.label}>Upload</label>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => uploadFiles(index, e.target.files)}
                  />

                  {sec.files.length > 0 &&
                    sec.files.map((file, fIdx) => (
                      <div key={fIdx}>
                        {file.mimetype?.startsWith("image/") ? (
                          <img
                            src={file.path}
                            alt=""
                            style={{ maxWidth: 150 }}
                          />
                        ) : (
                          <video
                            src={file.path}
                            controls
                            style={{ maxWidth: 150 }}
                          />
                        )}
                      </div>
                    ))}
                </>
              )}

              {sec.type === "youtube" && (
                <>
                  <label style={styles.label}>YouTube URL</label>
                  <input
                    style={styles.input}
                    value={sec.youtube}
                    onChange={(e) => {
                      const arr = [...formData.sections];
                      arr[index].youtube = e.target.value;
                      setFormData({ ...formData, sections: arr });
                    }}
                  />
                </>
              )}

              <label style={styles.label}>Moderne bronnen</label>
              {sec.modernSources.map((b, sIdx) => (
                <div key={sIdx} style={{ display: "flex", gap: 5 }}>
                  <input
                    style={{ ...styles.input, flex: 1 }}
                    value={b}
                    onChange={(e) => {
                      const arr = [...formData.sections];
                      arr[index].modernSources[sIdx] = e.target.value;
                      setFormData({ ...formData, sections: arr });
                    }}
                  />
                  <button
                    type="button"
                    style={{ ...styles.btn, ...styles.danger }}
                    onClick={() => {
                      const arr = [...formData.sections];
                      arr[index].modernSources = arr[index].modernSources.filter(
                        (_, x) => x !== sIdx
                      );
                      if (arr[index].modernSources.length === 0)
                        arr[index].modernSources.push("");

                      setFormData({ ...formData, sections: arr });
                    }}
                  >
                    -
                  </button>
                </div>
              ))}

              <button
                type="button"
                style={{ ...styles.btn, ...styles.primary }}
                onClick={() => {
                  const arr = [...formData.sections];
                  arr[index].modernSources.push("");
                  setFormData({ ...formData, sections: arr });
                }}
              >
                + Moderne bron toevoegen
              </button>
            </div>
          ))}

          <button
            type="button"
            style={{ ...styles.btn, ...styles.primary }}
            onClick={() =>
              setFormData({
                ...formData,
                sections: [
                  ...formData.sections,
                  {
                    title: "",
                    type: "text",
                    content: "",
                    files: [],
                    youtube: "",
                    modernSources: [""],
                  },
                ],
              })
            }
          >
            + Sectie toevoegen
          </button>

          <label style={styles.label}>Conclusies</label>
          <textarea
            style={styles.textarea}
            value={formData.conclusions}
            onChange={(e) =>
              setFormData({ ...formData, conclusions: e.target.value })
            }
          />

          <label style={styles.label}>PDF link</label>
          <input
            style={styles.input}
            value={formData.pdfLink}
            onChange={(e) =>
              setFormData({ ...formData, pdfLink: e.target.value })
            }
          />

          <label style={styles.label}>Bronnen</label>

          {formData.sources.map((src, i) => (
            <div key={i} style={{ display: "flex", gap: 5 }}>
              <input
                style={{ ...styles.input, flex: 1 }}
                value={src}
                onChange={(e) => {
                  const arr = [...formData.sources];
                  arr[i] = e.target.value;
                  setFormData({ ...formData, sources: arr });
                }}
              />
              <button
                type="button"
                style={{ ...styles.btn, ...styles.danger }}
                onClick={() => {
                  const arr = formData.sources.filter((_, x) => x !== i);
                  if (arr.length === 0) arr.push("");
                  setFormData({ ...formData, sources: arr });
                }}
              >
                -
              </button>
            </div>
          ))}

          <button
            type="button"
            style={{ ...styles.btn, ...styles.primary, marginBottom: "1rem" }}
            onClick={() =>
              setFormData({ ...formData, sources: [...formData.sources, ""] })
            }
          >
            + Bron toevoegen
          </button>

          <br />

          <button type="submit" style={{ ...styles.btn, ...styles.primary }}>
            Opslaan
          </button>

          <button
            type="button"
            style={{ ...styles.btn, ...styles.cancel }}
            onClick={() => navigate("/config")}
          >
            Annuleren
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditOnderzoek;
