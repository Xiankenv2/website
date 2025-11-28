import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AddOnderzoek = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // --------------------------
  // STARTDATA STRUCTUUR
  // --------------------------
  const [formData, setFormData] = useState({
    title: "",
    researchers: [""],
    date: "",
    goal: "",
    theme: "",
    mainQuestion: "",
    subQuestions: [""],
    researchType: "",
    sections: [
      {
        title: "",
        text: "",
        mediaType: "",
        mediaFiles: [],
        youtube: "",
      },
    ],
    conclusion: "",
    sources: [
      {
        title: "",
        author: "",
        link: "",
      },
    ],
    attachments: [],
  });

  const styles = {
    container: { padding: "2rem", maxWidth: "900px", margin: "0 auto" },
    panel: {
      background: "#f8f8f8",
      padding: "1.5rem",
      borderRadius: "8px",
      border: "1px solid #ddd",
    },
    label: { display: "block", marginTop: "1rem", fontWeight: 600 },
    input: {
      width: "100%",
      padding: ".6rem",
      borderRadius: "5px",
      border: "1px solid #ccc",
      marginTop: ".3rem",
    },
    textarea: {
      width: "100%",
      padding: ".6rem",
      minHeight: "120px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      marginTop: ".3rem",
    },
    btnPrimary: {
      padding: ".6rem 1rem",
      background: "#0077ff",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginRight: ".5rem",
      marginTop: "1rem",
      fontWeight: 600,
    },
    btnDanger: {
      padding: ".6rem 1rem",
      background: "#d9534f",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginLeft: ".3rem",
      fontWeight: 600,
    },
    sectionBox: {
      background: "#fff",
      padding: "1rem",
      border: "1px solid #ccc",
      borderRadius: "8px",
      marginTop: "1rem",
    },
  };

  // -------------------------
  // MEDIA UPLOAD HANDLER
  // -------------------------
  const uploadMedia = async (sectionIndex, files) => {
    try {
      const token = localStorage.getItem("token");
      const fd = new FormData();

      Array.from(files).forEach((f) => fd.append("files", f));

      const res = await fetch("http://localhost:3000/api/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });

      if (!res.ok) throw new Error("Upload mislukt");

      const data = await res.json();

      const updated = [...formData.sections];
      updated[sectionIndex].mediaFiles.push(...data.files);

      setFormData({ ...formData, sections: updated });
    } catch (e) {
      setError(e.message);
    }
  };

  // -------------------------
  // OPSLAAN IN BACKEND
  // -------------------------
  const saveReport = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3000/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const backend = await res.json().catch(() => null);

      if (!res.ok) {
        setError(backend?.error || backend?.message || "Opslaan mislukt");
        return;
      }

      setSuccess("Onderzoek succesvol aangemaakt!");
      setTimeout(() => navigate("/config"), 1200);
    } catch (e) {
      setError(e.message);
    }
  };

  if (!user) return <p>Laden...</p>;

  return (
    <div style={styles.container}>
      <h1>Nieuw onderzoek</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <div style={styles.panel}>
        <form onSubmit={saveReport}>
          {/* -------------------------
              1. Titel
          -------------------------- */}
          <label style={styles.label}>1. Onderzoekstitel</label>
          <input
            style={styles.input}
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          {/* -------------------------
              2. Onderzoekers
          -------------------------- */}
          <label style={styles.label}>2. Onderzoeker(s)</label>
          {formData.researchers.map((r, idx) => (
            <div key={idx} style={{ display: "flex", gap: "5px" }}>
              <input
                style={{ ...styles.input, flex: 1 }}
                value={r}
                onChange={(e) => {
                  const arr = [...formData.researchers];
                  arr[idx] = e.target.value;
                  setFormData({ ...formData, researchers: arr });
                }}
              />
              <button
                type="button"
                style={styles.btnDanger}
                onClick={() => {
                  const arr = formData.researchers.filter((_, i) => i !== idx);
                  setFormData({
                    ...formData,
                    researchers: arr.length ? arr : [""],
                  });
                }}
              >
                -
              </button>
            </div>
          ))}
          <button
            type="button"
            style={styles.btnPrimary}
            onClick={() =>
              setFormData({
                ...formData,
                researchers: [...formData.researchers, ""],
              })
            }
          >
            + Onderzoeker toevoegen
          </button>

          {/* -------------------------
              3. Datum
          -------------------------- */}
          <label style={styles.label}>3. Datum</label>
          <input
            type="date"
            style={styles.input}
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />

          {/* -------------------------
              4. Doel van het onderzoek
          -------------------------- */}
          <label style={styles.label}>4. Doel van het onderzoek</label>
          <textarea
            style={styles.textarea}
            value={formData.goal}
            onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
          />

          {/* -------------------------
              5. Thema
          -------------------------- */}
          <label style={styles.label}>5. Thema</label>
          <input
            style={styles.input}
            value={formData.theme}
            onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
          />

          {/* -------------------------
              6. Hoofdvraag
          -------------------------- */}
          <label style={styles.label}>7. Hoofdvraag</label>
          <input
            style={styles.input}
            value={formData.mainQuestion}
            onChange={(e) =>
              setFormData({ ...formData, mainQuestion: e.target.value })
            }
          />

          {/* -------------------------
              8. Deelvragen
          -------------------------- */}
          <label style={styles.label}>8. Deelvragen</label>
          {formData.subQuestions.map((q, idx) => (
            <div key={idx} style={{ display: "flex", gap: "5px" }}>
              <input
                style={{ ...styles.input, flex: 1 }}
                value={q}
                onChange={(e) => {
                  const arr = [...formData.subQuestions];
                  arr[idx] = e.target.value;
                  setFormData({ ...formData, subQuestions: arr });
                }}
              />
              <button
                type="button"
                style={styles.btnDanger}
                onClick={() => {
                  const arr = formData.subQuestions.filter((_, i) => i !== idx);
                  setFormData({
                    ...formData,
                    subQuestions: arr.length ? arr : [""],
                  });
                }}
              >
                -
              </button>
            </div>
          ))}

          <button
            type="button"
            style={styles.btnPrimary}
            onClick={() =>
              setFormData({
                ...formData,
                subQuestions: [...formData.subQuestions, ""],
              })
            }
          >
            + Deelvraag toevoegen
          </button>

          {/* -------------------------
              9. Type Onderzoek
          -------------------------- */}
          <label style={styles.label}>9. Type onderzoek</label>

          <label>
            <input
              type="radio"
              value="online"
              name="type"
              checked={formData.researchType === "online"}
              onChange={() =>
                setFormData({ ...formData, researchType: "online" })
              }
            />{" "}
            Online onderzoek
          </label>

          <label>
            <input
              type="radio"
              value="practical"
              name="type"
              checked={formData.researchType === "practical"}
              onChange={() =>
                setFormData({ ...formData, researchType: "practical" })
              }
            />{" "}
            Uitgevoerd onderzoek (fysiek / praktisch)
          </label>

          {/* -------------------------
              10. Secties
          -------------------------- */}
          <h2 style={{ marginTop: "2rem" }}>10. Onderzoekssecties</h2>

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

              <label style={styles.label}>Tekst</label>
              <textarea
                style={styles.textarea}
                value={sec.text}
                onChange={(e) => {
                  const arr = [...formData.sections];
                  arr[index].text = e.target.value;
                  setFormData({ ...formData, sections: arr });
                }}
              />

              <label style={styles.label}>Media type</label>
              <select
                style={styles.input}
                value={sec.mediaType}
                onChange={(e) => {
                  const arr = [...formData.sections];
                  arr[index].mediaType = e.target.value;
                  setFormData({ ...formData, sections: arr });
                }}
              >
                <option value="">Geen media</option>
                <option value="image">Afbeelding</option>
                <option value="video">Video</option>
                <option value="youtube">YouTube</option>
              </select>

              {sec.mediaType === "image" || sec.mediaType === "video" ? (
                <>
                  <label style={styles.label}>Upload media</label>
                  <input
                    type="file"
                    accept={sec.mediaType === "image" ? "image/*" : "video/*"}
                    onChange={(e) => uploadMedia(index, e.target.files)}
                  />
                </>
              ) : null}

              {sec.mediaType === "youtube" && (
                <>
                  <label style={styles.label}>YouTube-link</label>
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

              <button
                type="button"
                style={styles.btnDanger}
                onClick={() => {
                  const arr = formData.sections.filter((_, i) => i !== index);
                  setFormData({
                    ...formData,
                    sections: arr.length ? arr : [
                      { title: "", text: "", mediaType: "", mediaFiles: [], youtube: "" }
                    ],
                  });
                }}
              >
                Sectie verwijderen
              </button>
            </div>
          ))}

          <button
            type="button"
            style={styles.btnPrimary}
            onClick={() =>
              setFormData({
                ...formData,
                sections: [
                  ...formData.sections,
                  {
                    title: "",
                    text: "",
                    mediaType: "",
                    mediaFiles: [],
                    youtube: "",
                  },
                ],
              })
            }
          >
            + Sectie toevoegen
          </button>

          {/* -------------------------
              11. Conclusie
          -------------------------- */}
          <label style={styles.label}>11. Conclusie</label>
          <textarea
            style={styles.textarea}
            value={formData.conclusion}
            onChange={(e) =>
              setFormData({ ...formData, conclusion: e.target.value })
            }
          />

          {/* -------------------------
              12. Bronnen
          -------------------------- */}
          <h2 style={{ marginTop: "2rem" }}>12. Bronnen</h2>

          {formData.sources.map((src, i) => (
            <div key={i} style={styles.sectionBox}>
              <label style={styles.label}>Titel</label>
              <input
                style={styles.input}
                value={src.title}
                onChange={(e) => {
                  const arr = [...formData.sources];
                  arr[i].title = e.target.value;
                  setFormData({ ...formData, sources: arr });
                }}
              />

              <label style={styles.label}>Auteur (optioneel)</label>
              <input
                style={styles.input}
                value={src.author}
                onChange={(e) => {
                  const arr = [...formData.sources];
                  arr[i].author = e.target.value;
                  setFormData({ ...formData, sources: arr });
                }}
              />

              <label style={styles.label}>URL / boek / onderzoekstitel</label>
              <input
                style={styles.input}
                value={src.link}
                onChange={(e) => {
                  const arr = [...formData.sources];
                  arr[i].link = e.target.value;
                  setFormData({ ...formData, sources: arr });
                }}
              />

              <button
                type="button"
                style={styles.btnDanger}
                onClick={() => {
                  const arr = formData.sources.filter((_, x) => x !== i);
                  setFormData({
                    ...formData,
                    sources: arr.length ? arr : [
                      { title: "", author: "", link: "" }
                    ],
                  });
                }}
              >
                Bron verwijderen
              </button>
            </div>
          ))}

          <button
            type="button"
            style={styles.btnPrimary}
            onClick={() =>
              setFormData({
                ...formData,
                sources: [
                  ...formData.sources,
                  { title: "", author: "", link: "" },
                ],
              })
            }
          >
            + Bron toevoegen
          </button>

          {/* -------------------------
              13. Bijlagen
          -------------------------- */}
          <label style={styles.label}>13. Bijlagen</label>
          <input
            type="file"
            multiple
            onChange={(e) =>
              setFormData({
                ...formData,
                attachments: [...formData.attachments, ...e.target.files],
              })
            }
          />

          <button type="submit" style={styles.btnPrimary}>
            Onderzoek opslaan
          </button>
          <button
            type="button"
            style={styles.btnDanger}
            onClick={() => navigate("/config")}
          >
            Annuleren
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddOnderzoek;
