import { ChangeEvent, useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../@/components/ui/dialog"
import { Button } from "../../@/components/ui/button"
import { Input } from "../../@/components/ui/input"
import { fileToDataUrl } from "../utils"

type LocalImageModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (value: string | null) => void
  currentImage?: string | null
}

const LocalImageModal = ({
  open,
  onOpenChange,
  onSave,
  currentImage,
}: LocalImageModalProps) => {
  const [preview, setPreview] = useState<string | null>(currentImage ?? null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (open) {
      setPreview(currentImage ?? null)
      setError(null)
    }
  }, [open, currentImage])

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      setPreview(currentImage ?? null)
      return
    }
    if (!file.type.startsWith("image/")) {
      setError("Kun bildefiler støttes.")
      return
    }
    const dataUrl = await fileToDataUrl(file)
    setPreview(dataUrl)
    setError(null)
  }

  const handleSave = () => {
    if (!preview) {
      setError("Velg et bilde før du lagrer.")
      return
    }
    onSave(preview)
    onOpenChange(false)
  }

  const handleRemove = () => {
    setPreview(null)
    onSave(null)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Lokal bildeopplasting</DialogTitle>
          <DialogDescription>
            Bildet lagres bare i nettleseren din og brukes foran lagrede bilder.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          {preview ? (
            <img
              src={preview}
              alt="forhandsvisning"
              className="h-48 w-full rounded-md border object-cover"
            />
          ) : (
            <div className="flex h-48 w-full items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
              Ingen bilde valgt
            </div>
          )}
          <Input type="file" accept="image/*" onChange={handleFileChange} />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <DialogFooter className="flex flex-row justify-between gap-2">
            <Button variant="outline" onClick={handleRemove}>
              Fjern lokalt bilde
            </Button>
            <Button onClick={handleSave} disabled={!preview}>
              Lagre
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default LocalImageModal
