'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase-client'
import { Upload, Loader2, X, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ImageUploadProps {
    value?: string
    onChange: (url: string) => void
    label: string
    lpId: string
}

export default function ImageUpload({ value, onChange, label, lpId }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false)
    const [preview, setPreview] = useState(value)

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = e.target.files?.[0]
            if (!file) return

            setUploading(true)
            const supabase = createClient()

            // Create a unique file path
            const fileExt = file.name.split('.').pop()
            const fileName = `${lpId}/${Math.random().toString(36).substring(2)}.${fileExt}`
            const filePath = `${fileName}`

            const { error: uploadError } = await supabase.storage
                .from('landing-pages')
                .upload(filePath, file)

            if (uploadError) throw uploadError

            const { data: { publicUrl } } = supabase.storage
                .from('landing-pages')
                .getPublicUrl(filePath)

            setPreview(publicUrl)
            onChange(publicUrl)
        } catch (error: any) {
            alert('Erro no upload: ' + error.message)
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="space-y-2 mb-4">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">{label}</label>
            <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-xl border-2 border-dashed border-[#E2E8F0] bg-[#F8FAFC] overflow-hidden flex items-center justify-center shrink-0">
                    {preview ? (
                        <>
                            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                            <button
                                onClick={() => { setPreview(''); onChange('') }}
                                className="absolute top-1 right-1 p-1 bg-white/80 rounded-full text-red-500 hover:bg-white"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </>
                    ) : (
                        <Upload className="w-6 h-6 text-[#94A3B8]" />
                    )}
                    {uploading && (
                        <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                            <Loader2 className="w-5 h-5 text-[#0D7C66] animate-spin" />
                        </div>
                    )}
                </div>

                <div className="flex-1">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleUpload}
                        className="hidden"
                        id={`upload-${label}`}
                        disabled={uploading}
                    />
                    <label
                        htmlFor={`upload-${label}`}
                        className={cn(
                            "btn btn-sm cursor-pointer",
                            uploading ? "btn-ghost opacity-50 cursor-not-allowed" : "btn-secondary"
                        )}
                    >
                        {preview ? 'Trocar Imagem' : 'Selecionar Arquivo'}
                    </label>
                    <p className="text-[10px] text-[#94A3B8] mt-2">
                        Formatos: PNG, JPG ou WebP. Máx 5MB.
                    </p>
                </div>
            </div>
        </div>
    )
}
