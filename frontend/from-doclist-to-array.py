#! python3
import sys
prepend_tabs='                          '
tabs=''
is_first=True
for line in sys.stdin.readlines():
 l=line.strip()
 if not l: continue
 spl=l.split(':')
 tit=spl[0][1:].strip().capitalize()
 txt=spl[1].strip().capitalize()
 print(f'{tabs}["{tit}", "{txt}"],')
 if is_first:
  tabs=prepend_tabs
  is_first=False



# Docus:
'''
1. VIVIENDA (ley de alquileres, de Inquilinxs Agrupadxs)
https://docs.google.com/document/d/1rJP4hMDULEb3kpP5PYKgFyU1K2tCF3g-bn0LI4rYvzs/edit?usp=sharing

2. TRABAJO (regulación de trabajo en Plataformas Digitales de Servicios, de Jackson-Orsini, adaptado por APPSindical y O.D.I.A.)
https://docs.google.com/document/d/1zHv7KQ5MdOdGj8eUC0o_a0Hf0CIt0bWh3k39RHKSqAY/edit?usp=sharing

3. DROGAS (acuerdo para la regulación legal del cannabis, por THC y F.O.C.A., Federación de Organizaciones Cannabicas de Argentina)
https://docs.google.com/document/d/1D59UN94CYQujfnqfrmuiA2jLCf2Ul1Lw8F_jZTGnjMY/edit?usp=sharing

4. TRANSPARENCIA (ley de lobby, por Directorio Legislativo)
https://docs.google.com/document/d/1SAHWdcGdev3INGVTnVDPM9aXljmKqXwxCVZd0WqxzdA/edit?usp=sharing

5. AMBIENTE (Protección ambiental para la manipulación y aplicación de agroquímicos) 
https://docs.google.com/document/d/1PeZSTXko2-ySrSQcS7Xe8OUDAlZs1CqaJz4YBpI2gLo/edit?usp=sharing

6. GÉNERO (Provisión de Elementos para la Gestión Menstrual)
https://docs.google.com/document/d/18Gp6WRLEB8pG2GHxqO9Nm2S1ATuMRF6NBARr3Tyd7vY/edit?usp=sharing
'''
