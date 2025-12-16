import React, { useState } from 'react';
import { User, Mail, Lock, Calendar, GraduationCap, BookOpen, Users, CheckCircle, AlertCircle, RotateCcw } from 'lucide-react';

const FormDemo = () => {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    password: '',
    usia: '',
    jurusan: '',
    semester: '1',
    newsletter: false,
    gender: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [touched, setTouched] = useState({});

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nama.trim()) {
      newErrors.nama = 'Nama lengkap harus diisi!';
    } else if (formData.nama.trim().length < 2) {
      newErrors.nama = 'Nama minimal 2 karakter!';
    }

    if (!formData.email) {
      newErrors.email = 'Email harus diisi!';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid!';
    }

    if (!formData.password) {
      newErrors.password = 'Password harus diisi!';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter!';
    }

    if (!formData.usia) {
      newErrors.usia = 'Usia harus diisi!';
    } else if (formData.usia < 17 || formData.usia > 60) {
      newErrors.usia = 'Usia harus antara 17 - 60 tahun!';
    }

    if (!formData.jurusan) {
      newErrors.jurusan = 'Jurusan harus dipilih!';
    }

    if (!formData.gender) {
      newErrors.gender = 'Jenis kelamin harus dipilih!';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      console.log('Data form berhasil:', formData);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }
  };

  const handleReset = () => {
    setFormData({
      nama: '',
      email: '',
      password: '',
      usia: '',
      jurusan: '',
      semester: '1',
      newsletter: false,
      gender: ''
    });
    setErrors({});
    setTouched({});
  };

  const hasError = (fieldName) => {
    return errors[fieldName] && touched[fieldName];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <GraduationCap className="text-white" size={32} />
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Formulir Pendaftaran
          </h1>
          <p className="text-slate-600">Lengkapi data diri Anda dengan benar</p>
        </div>

        {isSubmitted && (
          <div className="mb-6 animate-in fade-in slide-in-from-top duration-300">
            <div className="bg-emerald-50 border-l-4 border-emerald-500 rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-emerald-500" size={24} />
                <p className="text-emerald-800 font-semibold">Data berhasil dikirim!</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <div className="mb-6">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <User size={18} className="text-blue-500" />
              Nama Lengkap
            </label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Masukkan nama lengkap"
              className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all duration-200 ${
                hasError('nama')
                  ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                  : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
              }`}
            />
            {hasError('nama') && (
              <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                <AlertCircle size={16} />
                <span>{errors.nama}</span>
              </div>
            )}
          </div>

          <div className="mb-6">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <Mail size={18} className="text-blue-500" />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="nama@email.com"
              className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all duration-200 ${
                hasError('email')
                  ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                  : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
              }`}
            />
            {hasError('email') && (
              <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                <AlertCircle size={16} />
                <span>{errors.email}</span>
              </div>
            )}
          </div>

          <div className="mb-6">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <Lock size={18} className="text-blue-500" />
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Minimal 6 karakter"
              className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all duration-200 ${
                hasError('password')
                  ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                  : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
              }`}
            />
            {hasError('password') && (
              <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                <AlertCircle size={16} />
                <span>{errors.password}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <Calendar size={18} className="text-blue-500" />
                Usia
              </label>
              <input
                type="number"
                name="usia"
                value={formData.usia}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="17-60"
                className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all duration-200 ${
                  hasError('usia')
                    ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                    : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
                }`}
              />
              {hasError('usia') && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  <span>{errors.usia}</span>
                </div>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <BookOpen size={18} className="text-blue-500" />
                Semester
              </label>
              <input
                type="number"
                name="semester"
                min="1"
                max="8"
                value={formData.semester}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <GraduationCap size={18} className="text-blue-500" />
              Jurusan
            </label>
            <select
              name="jurusan"
              value={formData.jurusan}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all duration-200 ${
                hasError('jurusan')
                  ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                  : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
              }`}
            >
              <option value="">Pilih Jurusan</option>
              <option value="Informatika">Informatika</option>
              <option value="Sistem Informasi">Sistem Informasi</option>
              <option value="Teknik Komputer">Teknik Komputer</option>
            </select>
            {hasError('jurusan') && (
              <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                <AlertCircle size={16} />
                <span>{errors.jurusan}</span>
              </div>
            )}
          </div>

          <div className="mb-6">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
              <Users size={18} className="text-blue-500" />
              Jenis Kelamin
            </label>
            <div className="flex gap-4">
              <label className={`flex items-center gap-2 px-6 py-3 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                formData.gender === 'Laki-laki'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}>
                <input
                  type="radio"
                  name="gender"
                  value="Laki-laki"
                  checked={formData.gender === 'Laki-laki'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="font-medium text-slate-700">Laki-laki</span>
              </label>
              <label className={`flex items-center gap-2 px-6 py-3 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                formData.gender === 'Perempuan'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}>
                <input
                  type="radio"
                  name="gender"
                  value="Perempuan"
                  checked={formData.gender === 'Perempuan'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="font-medium text-slate-700">Perempuan</span>
              </label>
            </div>
            {hasError('gender') && (
              <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                <AlertCircle size={16} />
                <span>{errors.gender}</span>
              </div>
            )}
          </div>

          <div className="mb-8">
            <label className="flex items-center gap-3 px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100 transition-all duration-200">
              <input
                type="checkbox"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleChange}
                className="w-5 h-5 text-blue-600 rounded"
              />
              <span className="font-medium text-slate-700">Berlangganan Newsletter</span>
            </label>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <CheckCircle size={20} />
              Kirim
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-4 px-6 rounded-xl border-2 border-slate-200 hover:border-slate-300 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <RotateCcw size={20} />
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormDemo;
