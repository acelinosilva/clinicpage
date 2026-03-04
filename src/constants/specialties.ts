import {
    Stethoscope, Activity, Sparkles, Brain, Salad,
    Sun, Bone, Heart, Baby, Eye, PawPrint, Zap, Plus,
    HeartPulse as HeartPulseIcon, Scissors
} from 'lucide-react'

export const SPECIALTIES = [
    { id: 'odontologia', label: 'Odontologia', icon: Stethoscope },
    { id: 'estetica', label: 'Estética e Beleza', icon: Scissors },
    { id: 'psicologia', label: 'Psicologia', icon: Brain },
    { id: 'nutricao', label: 'Nutrição', icon: Salad },
    { id: 'fisioterapia', label: 'Fisioterapia', icon: Activity },
    { id: 'dermatologia', label: 'Dermatologia', icon: Sun },
    { id: 'ortopedia', label: 'Ortopedia', icon: Bone },
    { id: 'ginecologia', label: 'Ginecologia', icon: Heart },
    { id: 'pediatria', label: 'Pediatria', icon: Baby },
    { id: 'cardiologia', label: 'Cardiologia', icon: HeartPulseIcon },
    { id: 'ofatlmologia', label: 'Oftalmologia', icon: Eye },
    { id: 'veterinaria', label: 'Veterinária', icon: PawPrint },
    { id: 'quiropraxia', label: 'Quiropraxia', icon: Zap },
    { id: 'acupuntura', label: 'Acupuntura', icon: Sparkles },
    { id: 'clinica_geral', label: 'Clínica Geral', icon: Stethoscope },
    { id: 'outro', label: 'Outra Especialidade', icon: Plus },
]
