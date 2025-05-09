"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "../../components/ui/buttom"
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Eye, FileImage } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface LihatLaporanModalProps {
   id: number
   nama: string
   judul: string
   kategori: string
   tanggal: string
   status: string
   isi: string
   lokasi?: string
   kontak?: string
   gambar?: string
}

export function LihatLaporanModal({
   id,
   nama,
   judul,
   kategori,
   tanggal,
   status,
   isi,
   lokasi,
   kontak,
   gambar,
}: LihatLaporanModalProps) {
   const [open, setOpen] = useState<boolean>(false)

   const getStatusColor = (status: string): string => {
      switch (status) {
         case "Sedang Diproses":
            return "bg-red-100 text-red-800"
         case "Selesai":
            return "bg-green-100 text-green-800"
         default:
            return "bg-gray-100 text-gray-800"
      }
   }

   const keterangan =
      status === "Selesai"
         ? "Laporan telah ditindaklanjuti dan diselesaikan oleh petugas desa."
         : status === "Sedang Diproses"
            ? "Laporan sedang dalam proses penanganan oleh petugas desa."
            : "Laporan belum ditindaklanjuti dan sedang menunggu untuk diproses."

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>
            <Button className="bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-blue-100" size="sm">
               <Eye className="h-4 w-4" />
               <span className="sr-only">Lihat</span>
            </Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
               <DialogTitle>Detail Laporan Masyarakat</DialogTitle>
               <DialogDescription className="flex items-center gap-2">
                  <span>ID: {id}</span>
                  <span>•</span>
                  <span>{tanggal}</span>
                  <span>•</span>
                  <Badge className={getStatusColor(status)}>{status}</Badge>
               </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="info" className="w-full">
               <TabsList className="grid w-full bg-gray-300 grid-cols-2">
                  <TabsTrigger value="info" className="data-[state=active]:bg-white data-[state=active]:text-black text-gray-600 rounded-lg">Informasi</TabsTrigger>
                  <TabsTrigger value="gambar" className="data-[state=active]:bg-white data-[state=active]:text-black text-gray-600 rounded-lg">Foto Laporan</TabsTrigger>
               </TabsList>

               <TabsContent value="info" className="py-4">
                  <div className="space-y-4">
                     <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-1 col-span-2">
                           <p className="text-sm font-medium text-muted-foreground">Judul Laporan</p>
                           <p className="text-sm font-semibold">{judul}</p>
                        </div>
                        <div className="space-y-1">
                           <p className="text-sm font-medium text-muted-foreground">Kategori</p>
                           <p className="text-sm">{kategori}</p>
                        </div>
                     </div>

                     <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-1">
                           <p className="text-sm font-medium text-muted-foreground">Nama Pelapor</p>
                           <p className="text-sm">{nama}</p>
                        </div>
                        <div className="space-y-1">
                           <p className="text-sm font-medium text-muted-foreground">Kontak</p>
                           <p className="text-sm">{kontak || "-"}</p>
                        </div>
                        <div className="space-y-1">
                           <p className="text-sm font-medium text-muted-foreground">Lokasi</p>
                           <p className="text-sm">{lokasi || "-"}</p>
                        </div>
                     </div>

                     <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Isi Laporan</p>
                        <div className="text-sm p-3 bg-gray-50 rounded-md border">
                           <p className="whitespace-pre-line text-justify">{isi}</p>
                        </div>
                     </div>

                     <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Keterangan Status</p>
                        <p className="text-sm">{keterangan}</p>
                     </div>

                     {status === "Selesai" && (
                        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                           <p className="text-sm text-green-800">
                              Laporan telah ditindaklanjuti dan diselesaikan. Terima kasih atas partisipasi Anda dalam membantu
                              meningkatkan kualitas desa.
                           </p>
                        </div>
                     )}

                     {status === "Diproses" && (
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                           <p className="text-sm text-blue-800">
                              Laporan sedang dalam proses penanganan. Petugas desa akan segera menindaklanjuti laporan ini.
                           </p>
                        </div>
                     )}
                  </div>
               </TabsContent>

               <TabsContent value="gambar" className="py-4">
                  {gambar ? (
                     <div className="flex flex-col items-center space-y-3">
                        <h3 className="text-lg font-medium">Foto Laporan</h3>
                        <div className="border rounded-md overflow-hidden">
                           <Image
                              src={gambar || "/default-image.jpg"}
                              alt="Foto Laporan"
                              width={600}
                              height={400}
                              className="object-contain"
                              style={{ maxWidth: "100%", height: "auto" }}
                           />
                        </div>
                        <p className="text-sm text-muted-foreground italic">
                           Foto yang dilampirkan oleh pelapor sebagai bukti pendukung
                        </p>
                     </div>
                  ) : (
                     <div className="flex flex-col items-center justify-center h-40 border rounded-md border-dashed">
                        <FileImage className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Tidak ada foto yang dilampirkan</p>
                     </div>
                  )}
               </TabsContent>
            </Tabs>

            <DialogFooter>
               <Button variant="ghost" onClick={() => setOpen(false)}>Tutup</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}
