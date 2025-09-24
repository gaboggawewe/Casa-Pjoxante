"use client"

import { useState, useEffect, useCallback } from 'react'
import { getBlogPostsData } from '@/services/blog/blog-service'
import type { BlogPost } from '@/services/blog/blog-types'

// Cache global para los posts del blog
let globalBlogCache: BlogPost[] | null = null
let globalCacheTimestamp: number | null = null
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutos

export const useBlogCache = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(globalBlogCache || [])
  const [loading, setLoading] = useState(!globalBlogCache)
  const [error, setError] = useState<string | null>(null)

  const loadBlogPosts = useCallback(async (forceRefresh = false) => {
    // Si tenemos cache válido y no es refresh forzado, usarlo
    const now = Date.now()
    if (!forceRefresh && globalBlogCache && globalCacheTimestamp && 
        (now - globalCacheTimestamp) < CACHE_DURATION) {
      console.log('Using cached blog data')
      setBlogPosts(globalBlogCache)
      setLoading(false)
      return { data: globalBlogCache, error: null }
    }

    // Si no hay cache o está expirado, cargar datos
    console.log('Loading fresh blog data...')
    setLoading(true)
    setError(null)
    
    try {
      const result = await getBlogPostsData()
      if (result.data) {
        globalBlogCache = result.data
        globalCacheTimestamp = now
        setBlogPosts(result.data)
        console.log('Blog data loaded and cached')
        return result
      } else {
        setError(result.error || 'Error al cargar publicaciones')
        return result
      }
    } catch (error) {
      console.error('Error loading blog posts:', error)
      setError('Error de conexión al cargar publicaciones')
      return { data: null, error: 'Error de conexión' }
    } finally {
      setLoading(false)
    }
  }, [])

  // Función para precargar datos sin afectar el estado del componente
  const preloadBlogData = useCallback(async () => {
    const now = Date.now()
    if (globalBlogCache && globalCacheTimestamp && 
        (now - globalCacheTimestamp) < CACHE_DURATION) {
      console.log('Blog data already cached, no preload needed')
      return
    }

    try {
      console.log('Preloading blog data in background...')
      const result = await getBlogPostsData()
      if (result.data) {
        globalBlogCache = result.data
        globalCacheTimestamp = now
        console.log('Blog data preloaded and cached in background')
      }
    } catch (error) {
      console.log('Background preload failed:', error)
    }
  }, [])

  return {
    blogPosts,
    loading,
    error,
    loadBlogPosts,
    preloadBlogData,
    hasCachedData: !!globalBlogCache
  }
}