import React, { useMemo, useState } from "react";

const defaultValues = {
  fullName: "",
  email: "",
  program: "",
  mode: "offline",
  agreement: false,
  notes: "",
};

const programOptions = [
  "Front-End Development",
  "Back-End Development",
  "Mobile Development",
  "UI/UX Fundamentals",
];

const EnrollmentForm = () => {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [submissions, setSubmissions] = useState([]);
  const [status, setStatus] = useState("");

  const validate = (nextValues = values) => {
    const nextErrors = {};
    if (!nextValues.fullName.trim()) {
      nextErrors.fullName = "Nama lengkap wajib diisi.";
    }
    if (!nextValues.email.trim()) {
      nextErrors.email = "Email wajib diisi.";
    } else if (!/^[\w.-]+@([\w-]+\.)+[\w-]{2,}$/i.test(nextValues.email)) {
      nextErrors.email = "Format email tidak valid.";
    }
    if (!nextValues.program) {
      nextErrors.program = "Silakan pilih program.";
    }
    if (!nextValues.agreement) {
      nextErrors.agreement = "Anda harus menyetujui kebijakan kelas.";
    }
    if (nextValues.notes.trim().length < 10) {
      nextErrors.notes = "Catatan tambahan minimal 10 karakter.";
    }
    return nextErrors;
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBlur = (event) => {
    const fieldName = event.target.name;
    const nextErrors = validate();
    setErrors(nextErrors);
    if (nextErrors[fieldName]) {
      setStatus("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationResult = validate();
    if (Object.keys(validationResult).length) {
      setErrors(validationResult);
      setStatus("");
      return;
    }

    const timestamp = new Date().toLocaleString("id-ID");
    setSubmissions((prev) => [
      { ...values, submittedAt: timestamp },
      ...prev.slice(0, 3),
    ]);
    setValues(defaultValues);
    setErrors({});
    setStatus("Form berhasil disubmit dan tersimpan secara lokal ✅");
  };

  const isSubmitDisabled = useMemo(
    () => !values.fullName || !values.email || !values.program,
    [values]
  );

  return (
    <div className="form-layout">
      <section className="form-card">
        <header>
          <h2>Formulir Pendaftaran Praktikum</h2>
          <p>
            Lengkapi data di bawah ini untuk mendaftar sesi praktikum Pemrograman
            Web Modern.
          </p>
        </header>
        {status && <div className="form-alert success">{status}</div>}
        <form onSubmit={handleSubmit} className="form-grid">
          <label>
            Nama Lengkap
            <input
              type="text"
              name="fullName"
              value={values.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Masukkan nama lengkap"
            />
            {errors.fullName && (
              <span className="error-text">{errors.fullName}</span>
            )}
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="contoh@email.com"
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </label>

          <label>
            Pilihan Program
            <select
              name="program"
              value={values.program}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">-- pilih program --</option>
              {programOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.program && (
              <span className="error-text">{errors.program}</span>
            )}
          </label>

          <fieldset className="mode-fieldset">
            <legend>Mode Belajar</legend>
            <label>
              <input
                type="radio"
                name="mode"
                value="offline"
                checked={values.mode === "offline"}
                onChange={handleChange}
              />
              Offline
            </label>
            <label>
              <input
                type="radio"
                name="mode"
                value="online"
                checked={values.mode === "online"}
                onChange={handleChange}
              />
              Online
            </label>
          </fieldset>

          <label className="full-width">
            Catatan Tambahan
            <textarea
              name="notes"
              rows={4}
              value={values.notes}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Tuliskan harapan atau kebutuhan khusus kelas."
            />
            {errors.notes && <span className="error-text">{errors.notes}</span>}
          </label>

          <label className="checkbox-field full-width">
            <input
              type="checkbox"
              name="agreement"
              checked={values.agreement}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            Saya telah membaca dan menyetujui kebijakan praktikum.
          </label>
          {errors.agreement && (
            <span className="error-text">{errors.agreement}</span>
          )}

          <div className="form-actions full-width">
            <button type="submit" disabled={isSubmitDisabled}>
              Simpan Data
            </button>
            <button
              type="button"
              className="secondary"
              onClick={() => {
                setValues(defaultValues);
                setErrors({});
                setStatus("");
              }}
            >
              Reset
            </button>
          </div>
        </form>
      </section>

      <section className="submission-card">
        <h3>Data Terkini</h3>
        {submissions.length === 0 ? (
          <p>Belum ada data tersimpan.</p>
        ) : (
          <ul>
            {submissions.map((item, index) => (
              <li key={`${item.email}-${index}`}>
                <strong>{item.fullName}</strong> – {item.program} ({item.mode})<br />
                <small>{item.email} • {item.submittedAt}</small>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default EnrollmentForm;
