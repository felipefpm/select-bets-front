'use client'
import React, { FormEvent, useEffect, useState } from 'react';
import { api } from '@/services/axios';
import Image from 'next/image';

import AppPreviewImg from '../assets/app-nlw-copa-preview.png'
import LogoImg from '../assets/logo.svg'
import UsersAvatar from '../assets/users-avatar-example.png'
import IconCheck from '../assets/icon-check.svg'

export default function Home() {
  const [betName, setBetName] = useState('')
  const [totalBets, setTotalBets] = useState(0)
  const [totalGuesses, setTotalGuesses] = useState(0)
  const [totalUsers, setTotalUsers] = useState(0)

  async function handleBets() {
    try {
      const response = await api.get('/bets/count')

      setTotalBets(response.data.count)
    } catch (error) {
      console.log('Erro: ', error)
    }
  }

  async function handleGuesses() {
    try {
      const response = await api.get('/guesses/count')

      setTotalGuesses(response.data.count)
    } catch (error) {
      console.log('Erro: ', error)
    }
  }

  async function handleUsers() {
    try {
      const response = await api.get('/users/count')

      setTotalUsers(response.data.count)
    } catch (error) {
      console.log('Erro: ', error)
    }
  }

  async function handleCreateBet(event: FormEvent) {
    event.preventDefault()

    try {
      const response = await api.post('/bets', {
        title: betName
      })

      const { code } = response.data

      await navigator.clipboard.writeText(code)

      alert(`Sua aposta foi feita com succeso, seu código é: ${code} e já esta na sua área de transferência`)

      setBetName('')

    } catch (error) {
      console.log('Error: ', error)
      alert('Falha ao criar sua aposta, tente novamente!')
    }

  }

  useEffect(() => {
    handleBets()
    handleGuesses()
    handleUsers()
  }, [])

  return (
    <div className='max-w-[1124px] h-screen mx-auto gap-28 grid grid-cols-2 items-center'>
      <main>
        <Image src={LogoImg} alt="Logo do app"/>
        <h1 className='mt-14 text-5xl font-bold leading-tight'>Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>

        <div className='mt-10 flex items-center gap-2 '>
          <Image src={UsersAvatar}  alt="Imagem de avatar de alguns usuarios"/>
          <strong className='text-gray-100 text-xl'>
            <span className='text-bets-500'>+ {totalUsers}</span> pessoas já estão usando
          </strong>
        </div>

        <form onSubmit={handleCreateBet} className='mt-10 flex gap-2'>
          <input 
            className='flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm'
            type="text" 
            required 
            placeholder='Qual nome do seu bolão?'
            onChange={e => setBetName(e.target.value)}
            value={betName}
          />
          <button
            className='bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm hover:bg-yellow-550'
            type='submit'
          >
            CRIAR MEU BOLÃO
          </button>
        </form>

        <p className='mt-4 text-sm text-gray-300 leading-relaxed'>
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀
        </p>
        
        <div className='mt-10 pt-10 border-t border-gray-600 flex justify-between text-gray-100'>
          <div className='flex items-center gap-6'>
            <Image src={IconCheck} alt='Icone de ckeck' />
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+ {totalBets}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className='w-px h-14 bg-gray-600' />
          
          <div className='flex items-center gap-6'>
            <Image src={IconCheck} alt='Icone de ckeck' />
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+ {totalGuesses}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <Image src={AppPreviewImg} alt="Dois calulares exibindo o aplicativo" />

    </div>
  );
}
