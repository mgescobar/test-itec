import { sign } from '@/utils/auth'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Método não permitido' })

  try {
    const { username, password } = req.body

    if (username === 'itec-furg' && password === '123') {
      const token = await sign({ username })
      
      res.setHeader(
        'Set-Cookie',
        `token=${token}; Path=/; Max-Age=7200; SameSite=Lax${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`
      )

      return res.status(200).json({ token })
    }

    return res.status(401).json({ message: 'Credenciais inválidas' })
    
  } catch (error) {
    console.error('Erro no login:', error)
    return res.status(500).json({ message: 'Erro interno no servidor' })
  }
}