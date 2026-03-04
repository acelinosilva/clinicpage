import { create } from 'zustand'
import { LandingPage, LPSections, LPTheme } from '@/types'

interface EditorState {
    lp: LandingPage | null
    setLP: (lp: LandingPage) => void
    updateSection: (sectionId: keyof LPSections, data: any) => void
    updateTheme: (theme: Partial<LPTheme>) => void
    loading: boolean
    setLoading: (loading: boolean) => void
    saving: boolean
    setSaving: (saving: boolean) => void
    error: string | null
    setError: (error: string | null) => void
    activeSection: keyof LPSections | null
    setActiveSection: (sectionId: keyof LPSections | null) => void
}

export const useEditorStore = create<EditorState>((set) => ({
    lp: null,
    loading: false,
    saving: false,
    error: null,
    activeSection: 'hero',

    setLP: (lp) => set({ lp }),

    updateSection: (sectionId, data) => set((state) => {
        if (!state.lp) return state
        return {
            lp: {
                ...state.lp,
                sections: {
                    ...state.lp.sections,
                    [sectionId]: {
                        ...state.lp.sections[sectionId],
                        ...data
                    }
                }
            }
        }
    }),

    updateTheme: (theme) => set((state) => {
        if (!state.lp) return state
        return {
            lp: {
                ...state.lp,
                theme: {
                    ...state.lp.theme,
                    ...theme
                }
            }
        }
    }),

    setLoading: (loading) => set({ loading }),
    setSaving: (saving) => set({ saving }),
    setError: (error) => set({ error }),
    setActiveSection: (activeSection) => set({ activeSection }),
}))
