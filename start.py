import discord
import asyncio
import json

with open("config.1.json", "r") as tokenfile:
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

@client.event
async def on_message(message):
    if message.content.lower().startswith('+uptime'):
        await client.delete_message(message)
        print("Uptime command")
        embed = discord.Embed(
            title="Uptime",
            color=0xe67e22
        )
        embed.add_field(
            name="Secondes",
            value=secondes
        )
        embed.add_field(
            name="Minutes",
            value=minutes
        )
        embed.add_field(
            name="Heures",
            value=heures
        )
        await client.send_message(message.channel, embed=embed)
    
async def papillote_uptime():
    await client.wait_until_ready()
    global minutes
    minutes = 0
    global secondes
    secondes = 0
    global heures
    heures = 0
    while not client.is_closed:
        await asyncio.sleep(1)
        secondes += 1
        if secondes == 60:
            secondes = 0
            minutes += 1
            if minutes == 60:
                minutes = 0
                heures += 1

client.loop.create_task(papillote_uptime())

client.run("{0}".format(token["token"]))
