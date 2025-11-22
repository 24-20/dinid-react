import { Outlet, useNavigate } from 'react-router-dom'
import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet'
import LocalImageModal from '../components/LocalImageModal'
import { Button } from '../../@/components/ui/button'

export type User = {
  name: string
  birthday: string
  img: string
  dagenstall: string
  id: string
}

type GlobalContextValue = {
  user: User | undefined
  setUser: (user: User | undefined) => void
  localImage: string | null
  setLocalImage: (value: string | null) => void
}

const LOCAL_IMAGE_STORAGE_KEY = 'localUserImage'

const GlobalContext = createContext<GlobalContextValue | undefined>(undefined)

const GlobalLayout = () => {
  const [user, setUser] = useState<User | undefined>(undefined)
  const [localImage, setLocalImageState] = useState<string | null>(null)
  const [localImageModalOpen, setLocalImageModalOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    const storedImage = window.localStorage.getItem(LOCAL_IMAGE_STORAGE_KEY)
    if (storedImage) {
      setLocalImageState(storedImage)
    }
  }, [])

  useEffect(() => {
    if (user && !localImage) {
      setLocalImageModalOpen(true)
    }
  }, [user, localImage])

  const cacheImages = (src: string) => {
    if (!src) {
      return
    }
    const image = new Image()
    image.src = src
  }

  const persistLocalImage = useCallback((value: string | null) => {
    if (typeof window === 'undefined') {
      return
    }
    if (value) {
      window.localStorage.setItem(LOCAL_IMAGE_STORAGE_KEY, value)
      setLocalImageState(value)
    } else {
      window.localStorage.removeItem(LOCAL_IMAGE_STORAGE_KEY)
      setLocalImageState(null)
    }
  }, [])

  const displayImage = useMemo(() => localImage ?? user?.img, [localImage, user])

  useEffect(() => {
    if (!user?.name && user) {
      navigate('/onboarding')
    }
    if (user?.name) {
      sessionStorage.setItem('id', user.id)
      if (displayImage) {
        cacheImages(displayImage)
      }
      navigate('/f')
    }
  }, [user, displayImage, navigate])

  const contextValue = useMemo(
    () => ({ user, setUser, localImage, setLocalImage: persistLocalImage }),
    [user, localImage, persistLocalImage]
  )

  return (
    <div className=" w-screen h-fit overflow-hidden hide-scrollbar  ">
      {displayImage && (
        <Helmet>
          <link rel="preload" href={displayImage} as="image" />
          <link rel="prefetch" href={displayImage} as="image" />
        </Helmet>
      )}
      <GlobalContext.Provider value={contextValue}>
        <AnimatePresence>
          <Outlet />
        </AnimatePresence>
      </GlobalContext.Provider>
      {user && (
        <Button
          size="sm"
          className="fixed bottom-4 right-4 z-50 shadow-lg"
          onClick={() => setLocalImageModalOpen(true)}
        >
          Oppdater lokalt bilde
        </Button>
      )}
      <LocalImageModal
        open={localImageModalOpen}
        onOpenChange={setLocalImageModalOpen}
        onSave={persistLocalImage}
        currentImage={localImage}
      />
    </div>
  )
}
export { GlobalContext }
export default GlobalLayout
