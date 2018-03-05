from Naked.toolshed.shell import execute_js

success = execute_js('main.js')

import discord
import asyncio
import json

with open("configg.json", "r") as tokenfile:
    token = json.load(tokenfile)
client = discord.Client()
ownerid1 = "223864389256609792"
ownerid2 = "267011733871263745"
prefix = '+'

minutes = 0
secondes = 0
heures = 0

@client.event
async def on_ready():
    print('TVDQHDNGQH')
    print(client.user.name)
    print(client.user.id)
    print('---------------')
    
async def papillote_uptime():
    await client.wait_until_ready()
     global minutes
     minutes = 0
     global secondes
     secondes = 0
     global heures
     heures = 0
     time['secondes'] = 0
     time['heures'] = 0
     time['minutes'] = 0
     with open("uptime.json", "w") as fp:
     json.dump(time, fp)
     while not client.is_closed:
         await asyncio.sleep(1)
         time = {}
         secondes += 1
         time['secondes'] = secondes
         with open("uptime.json", "w") as fp:
         json.dump(time, fp)
         if secondes == 60:
            secondes = 0
            minutes += 1
            time['secondes'] = secondes
            time['minutes'] = minutes
            with open("uptime.json", "w") as fp:
            json.dump(time, fp)
            if minutes == 60:
               minutes = 0
               hour += 1
               time['heures'] = heures
               time['minutes'] = minutes
               with open("uptime.json", "w") as fp:
               json.dump(time, fp)

client.loop.create_task(papillote_uptime())

client.run("{0}".format(token["token"]))
