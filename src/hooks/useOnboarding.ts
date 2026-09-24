import { useLocalStorage } from './useLocalStorage'

export function useOnboarding() {
  const [concluido, setConcluido] = useLocalStorage<boolean>('tikblox:onboarding-concluido', false)

  return {
    onboardingConcluido: concluido,
    concluirOnboarding: () => setConcluido(true),
  }
}
