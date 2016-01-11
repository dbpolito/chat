<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Redis;

class SocketListener extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'socket:listener';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Socket listener';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->info('Listening the socket');

        Redis::psubscribe('*', function($message) {
            $message = json_decode($message, true);
            $event = $message['event'];
            $data = $message['data'];

            // Do not trigger broadcastable events
            if (in_array(ShouldBroadcast::class, class_implements($event))) {
                return;
            }

            event(new $event($data));
        });
    }
}
