-- Membuat Table glbm_karyawan
CREATE TABLE "glbm_karyawan" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(20) NOT NULL UNIQUE,
  "fullname" VARCHAR(255) NOT NULL,
  "email" VARCHAR(255) NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  "id_jabatan" INT NOT NULL,
  "username_atasan" VARCHAR(20) NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Meinsertkan data ke table glbm_karyawan untuk akun admin
INSERT INTO "glbm_karyawan" ("username", "fullname", "email", "password", "id_jabatan", "username_atasan", "created_at", "updated_at") VALUES
('administrator',	'Administrator',	'administrator@gmail.com',	'$2a$10$55N.o8Yo1w4Ysv2LcylFXuLXBMHx046DVkxvigHNy8iGeoFManq/a',	1,	'',	'2024-10-23 13:29:38.401574',	'2024-10-23 13:29:38.401574');

-- Membuat Table glbm_jabatan
CREATE TABLE "glbm_jabatan" (
  "id" SERIAL PRIMARY KEY,
  "nama" VARCHAR(255) NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Meinsertkan data ke table glbm_jabatan
INSERT INTO glbm_jabatan (nama) VALUES
('Administrator'),
('Supervisor'),
('Human Resource'),
('Staff Karyawan');

-- Membuat Table prct_absensi
CREATE TABLE "prct_absensi" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(20) NOT NULL,
  "tanggal" DATE NOT NULL,
  "jam_masuk" TIME,
  "jam_keluar" TIME,
  "keterangan" TEXT NOT NULL,
  "status_masuk" VARCHAR(150) NULL,
  "status_keluar" VARCHAR(150) NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Membuat Table prct_pengajuan_izin
CREATE TABLE "prct_pengajuan_izin" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(20) NOT NULL,
  "jenis_izin" VARCHAR(150) NOT NULL,
  "tanggal" DATE NOT NULL,
  "keterangan" TEXT NOT NULL,
  "approve_spv" BOOLEAN NOT NULL DEFAULT FALSE,
  "user_approve_spv" VARCHAR(20) NOT NULL DEFAULT '',
  "tgl_approve_spv" TIMESTAMP NULL DEFAULT NULL,
  "approve_hr" BOOLEAN NOT NULL DEFAULT FALSE,
  "user_approve_hr" VARCHAR(20) NOT NULL DEFAULT '',
  "tgl_approve_hr" TIMESTAMP  NULL DEFAULT NULL,
  "reject" BOOLEAN NOT NULL DEFAULT FALSE,
  "user_reject" VARCHAR(20) NOT NULL DEFAULT '',
  "tgl_reject" TIMESTAMP NULL DEFAULT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Membuat Table Jadwal
CREATE TABLE "glbm_jadwal" (
  "id" SERIAL PRIMARY KEY,
  "hari" VARCHAR(20) NOT NULL,
  "jam_masuk" TIME NOT NULL,
  "jam_keluar" TIME NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Meinsertkan data ke table glbm_jadwal
INSERT INTO glbm_jadwal (hari, jam_masuk, jam_keluar) VALUES
('Senin', '08:00:00', '17:00:00'),
('Selasa', '08:00:00', '17:00:00'),
('Rabu', '08:00:00', '17:00:00'),
('Kamis', '08:00:00', '17:00:00'),
('Jumat', '08:00:00', '17:00:00');

-- Membuat View Pengajuan Izin
CREATE VIEW "vw_pengajuan_izin" AS
SELECT
  pi.id,
  pi.username,
  k.username_atasan,
  k.fullname,
  pi.jenis_izin,
  pi.tanggal,
  pi.keterangan,
  CASE 
    WHEN pi.approve_spv = TRUE AND pi.approve_hr = TRUE AND pi.reject = FALSE THEN 'Disetujui'
    WHEN pi.approve_spv = TRUE AND pi.approve_hr = FALSE AND pi.reject = FALSE THEN 'Menunggu Persetujuan HR'
    WHEN pi.approve_spv = FALSE AND pi.approve_hr = FALSE AND pi.reject = FALSE THEN 'Menunggu Persetujuan Supervisor'
    WHEN pi.reject = TRUE THEN 'Ditolak'
    ELSE 'PROSES'
  END AS status,
  pi.approve_spv,
  pi.approve_hr
FROM prct_pengajuan_izin pi
LEFT JOIN glbm_karyawan k ON pi.username = k.username;

-- Membuat View Rekap Kehadiran
CREATE VIEW "vw_rekap_kehadiran" AS
SELECT
  a.id,
  k.username,
  k.fullname,
  'ABSEN' AS jenis,
  a.tanggal,
  a.jam_masuk,
  a.jam_keluar,
  a.keterangan,
  a.status_masuk,
  a.status_keluar,
  j.jam_masuk AS jam_masuk_jadwal,
  j.jam_keluar AS jam_keluar_jadwal
FROM prct_absensi a
LEFT JOIN glbm_karyawan k ON a.username = k.username
LEFT JOIN glbm_jadwal j ON CASE EXTRACT(DOW FROM a.tanggal)
    WHEN 1 THEN 'Minggu' 
    WHEN 2 THEN 'Senin' 
    WHEN 3 THEN 'Selasa' 
    WHEN 4 THEN 'Rabu' 
    WHEN 5 THEN 'Kamis' 
    WHEN 6 THEN 'Jumat' 
    WHEN 7 THEN 'Sabtu' 
  END = j.hari
UNION ALL
SELECT
  pi.id,
  k.username,
  k.fullname,
  'IZIN' AS jenis,
  pi.tanggal,
  NULL AS jam_masuk,
  NULL AS jam_keluar,
  pi.keterangan,
  NULL AS status_masuk,
  NULL AS status_keluar,
  NULL AS jam_masuk_jadwal,
  NULL AS jam_keluar_jadwal
FROM prct_pengajuan_izin pi
LEFT JOIN glbm_karyawan k ON pi.username = k.username;