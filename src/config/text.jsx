
import React from 'react'
import tone from '@mountbuild/tone-script'

export default {
  // generating music through combinatorics and automata
  about: {
    title: t('Ub(A)wt'),
    description: t('dj(E)nOreydiq my(u)zIk cruw k(a)mbInUt(o)rIks And Ut(a)mOta')
  },
  home: t('howm'),
  song: t('saq'),
  clickToStartAudio: t('klIk tO start adiyow'),
  clickToStartAudioFollowUp: t('CEn skrol dAwn'),
  format: t
}

function t(s) {
  return <span className="text">{tone(s)}</span>
}
